# NAME:     pals
# VERSION:  release
FROM debian:buster-slim

ENV PG_MAJOR 12
ENV RUBY_ALLOCATOR /usr/lib/libjemalloc.so.1
ENV RAILS_ENV production

#LABEL maintainer="Ryan Niemi"

RUN echo 2.0.`date +%Y%m%d` > /VERSION

RUN apt update && apt install -y gnupg sudo curl
RUN echo "debconf debconf/frontend select Teletype" | debconf-set-selections
RUN apt update && apt -y install fping
RUN sh -c "fping proxy && echo 'Acquire { Retries \"0\"; HTTP { Proxy \"http://proxy:3128\";}; };' > /etc/apt/apt.conf.d/40proxy && apt update || true"
RUN apt -y install software-properties-common
RUN apt-mark hold initscripts
RUN apt -y upgrade

RUN apt install -y locales locales-all
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

RUN curl https://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | apt-key add -
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ buster-pgdg main" | \
        tee /etc/apt/sources.list.d/postgres.list
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | sudo bash -
RUN apt -y update
# install these without recommends to avoid pulling in e.g.
# X11 libraries, mailutils
RUN apt -y install --no-install-recommends git rsyslog logrotate cron ssh-client
RUN apt -y install build-essential rsync \
                       libxslt-dev libcurl4-openssl-dev \
                       libssl-dev libyaml-dev libtool \
                       libxml2-dev gawk parallel \
                       postgresql-${PG_MAJOR} postgresql-client-${PG_MAJOR} \
                       postgresql-contrib-${PG_MAJOR} libpq-dev libreadline-dev \
                       anacron wget \
                       psmisc vim whois brotli libunwind-dev \
                       libtcmalloc-minimal4 cmake
RUN sed -i -e 's/start -q anacron/anacron -s/' /etc/cron.d/anacron
RUN sed -i.bak 's/$ModLoad imklog/#$ModLoad imklog/' /etc/rsyslog.conf
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN sh -c "test -f /sbin/initctl || ln -s /bin/true /sbin/initctl"
RUN cd / &&\
    apt -y install runit socat &&\
    mkdir -p /etc/runit/1.d &&\
    apt clean &&\
    rm -f /etc/apt/apt.conf.d/40proxy &&\
    locale-gen en_US &&\
    apt install -y nodejs &&\
    npm install -g uglify-js &&\
    npm install -g svgo


RUN mkdir -p /etc/runit/3.d

RUN useradd 8404pals -s /bin/bash -m -U &&\
    mkdir -p /var/www &&\
    cd /var/www &&\
    git clone https://github.com/ftc8404/8404pals &&\
    cd 8404pals &&\ 
    cp /var/www/8404pals/odbcinst.ini /etc/odbcinst.ini &&\
    cp -r ./app /app &&\
    git remote set-branches --add origin tests-passed &&\
    chown -R 8404pals:8404pals /var/www/8404pals &&\
    apt-get update && apt-get install -y tdsodbc unixodbc-dev &&\
    apt install unixodbc-bin -y  &&\
    apt install -y python-pip &&\
    apt-get clean -y  &&\
    pip install --no-cache-dir -U pip &&\
    pip install --no-cache-dir -r /app/requirements.txt
  #  cd /var/www/8404pals
    #sudo -u discourse bundle install --deployment --jobs 4 --without test developme>    bundle exec rake maxminddb:get &&\
    #find /var/www/discourse/vendor/bundle -name tmp -type d -exec rm -rf {} +

FROM tiangolo/uwsgi-nginx-flask:python3.7

LABEL Name=quixilver8404data Version=0.0.1
ENV LISTEN_PORT 5000
EXPOSE 5000

#Copy ODBC config


#Install FreeTDS and dependencies for PyODBC
#RUN apt-get update && apt-get install -y tdsodbc unixodbc-dev \
#    && apt install unixodbc-bin -y  \
#    && apt-get clean -y

#RUN pip install --no-cache-dir -U pip
#RUN pip install --no-cache-dir -r /app/requirements.txt
FROM python:3.8-alpine as base

####

FROM base as builder

WORKDIR /install

RUN apk update && \
  apk add --virtual build-deps git gcc python3-dev musl-dev jpeg-dev zlib-dev libevent-dev file-dev libffi-dev openssl && \
  apk add postgresql-dev

FROM base

COPY --from=builder /install /usr/local
RUN apk --no-cache add postgresql-libs ca-certificates libxslt jpeg zlib file libxml2

WORKDIR /data/app
ADD . .

EXPOSE 8080
ENTRYPOINT ["sh", "scripts/container_start.sh"]


FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
RUN npm run build
