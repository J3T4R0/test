import Provider from 'react-redux';
import React from 'react';
//import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import htmlReplace from 'gulp-html-replace';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import runSequence from 'run-sequence';
import babel from 'gulp-babel';
var gulp = require("gulp"),
    gulpsync = require('gulp-sync')(gulp),
    gutil = require("gulp-util"),
    ghPages = require('gulp-gh-pages');
var env = require('gulp-env'),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    webpackConfigGetter = require('./webpack.config.getter');

const paths = {
  bundle: 'app.js',
  entry: 'src/Index.js',
  srcCss: 'src/**/*.scss',
  srcImg: 'src/images/**',
  srcLint: ['src/**/*.js', 'test/**/*.js'],
  dist: 'dist',
  distJs: 'dist/js',
  distImg: 'dist/images',
  distDeploy: './dist/**/*',
  distHtml: 'src/html/index.html'
};

const customOpts = {
  entries: [paths.entry],
  debug: true
};

const opts = Object.assign({}, watchify.args, customOpts);

gulp.task("default", ["build-dev-server"]);

gulp.task("build-dev-server", sync("set-dev-env", "webpack:dev-server"));

gulp.task("webpack:dev-server", function(callback) {
  // modify some webpack config options
  var config = webpackConfigGetter();
  config.devtool = "eval";

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(config), {
    publicPath: paths.publicJsPath,
    contentBase : paths.publicContentBase,
    stats: {
      colors: true
    }
  }).listen(8181, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack:dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8181");
  });
});

gulp.task("build-dev", sync("set-dev-env", "webpack:build-dev"), function() {
  gulp.watch([paths.jsSources], ["webpack:build-dev"]); 
});

// create a single instance of the compiler to allow caching
var devCompiler = null;
gulp.task("webpack:build-dev", ["set-dev-env"], function(callback) {
  if(!devCompiler){
      devCompiler = webpack(webpackConfigGetter());
  }
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err)
      throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({colors: true}));
    callback();
  });
});

gulp.task('set-dev-env', function() {
  setEnv('DEV');
});

gulp.task('set-prod-env', function() {
  setEnv('PROD');
});

/*** GITHUB PAGES ***/

gulp.task('gh-pages', ["build"], function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});


/*** HELPER FUNCTIONS ***/

function setEnv(buildEnv){
  env({
    vars: {
      BUILD_ENV: buildEnv
    }
  });
}

function sync(){
  return gulpsync.sync([].slice.call(arguments));
}


gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('browserSync', () => {
  var historyApiFallback = require('connect-history-api-fallback');
  browserSync({
    server: {
      baseDir: './',
      middleware: [ historyApiFallback() ]
    }
  });
});

// convert jsx to JS
gulp.task('babelFiles', function() {
    return gulp.src('js/*.@(js|jsx)')
        .pipe(babel({
            compact: false,
            presets: ['env'],
            }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// Default task
gulp.task('default', ['babelFiles', 'browserSync']);

gulp.task('watchify', () => {
  const bundler = watchify(browserify(opts));
  function rebundle() {
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({ stream: true }));
  }
  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', () => {
  browserify(paths.entry, { debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source(paths.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distJs));
});

gulp.task('styles', () => {
  gulp.src(paths.srcCss)
  .pipe(rename({ extname: '.css' }))
  .pipe(sourcemaps.init())
  .pipe(postcss([vars, extend, nested, autoprefixer, cssnano]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.dist))
  .pipe(reload({ stream: true }));
});

gulp.task('htmlReplace', () => {
  gulp.src(paths.distHtml)
  .pipe(htmlReplace({ css: 'styles/main.css', js: 'js/app.js' }))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
  gulp.src(paths.srcImg)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.distImg));
});

gulp.task('lint', () => {
  gulp.src(paths.srcLint)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcLint, ['lint']);
});

gulp.task('watch', cb => {
  runSequence('clean', ['browserSync', 'watchTask', 'watchify', 'styles', 'lint', 'images'], cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'styles', 'htmlReplace', 'images'], cb);
});
