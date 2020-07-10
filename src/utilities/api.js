'use strict';
import { browserHistory } from 'react-router'
import GLOBAL from './global';

var Api = {

  get_api_url : function() {
    return GLOBAL.apiUrl;
  },

  get_callback_url : function() {
    return GLOBAL.callbackUrl;
  },

  get_github_auth_url: function() {
    var uuid = require('node-uuid');
    const state = uuid.v4();
    const callbackUrl = this.get_callback_url();
    const githubAuthUrl = GLOBAL.githubAuthUrl;
    return githubAuthUrl + '&redirect_uri=' + callbackUrl + '/callback&state=' + state;
  },

  send_request: function (url, method, data, anonymous) {
    const self = this;
    if (data) {
      data = JSON.stringify(data);
    }
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open(method || 'GET', url);
      request.setRequestHeader('Content-Type', 'application/json');
      const access_token = sessionStorage.getItem('access_token');
      if (access_token) {
        request.setRequestHeader('access_token', access_token);
      }
      else {
        if (!anonymous) {
          //sessionStorage.setItem('last_url', window.location);
          browserHistory.push('/');
          return;
        }
      }
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
           var data = 'response' in request ? request.response : request.responseText;
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            console.error(e);
            reject(e);
          }
        } else {
          reject(request.response);
        }
      };
      request.onerror = function () {
        alert(request.status);
        reject(request.status);
      };
      if (data) {
        request.send(data);
      } else {
        request.send();
      }
    });
  }
};

export default Api;
