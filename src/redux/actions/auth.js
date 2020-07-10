
import API from '../../utilities/api';

import { browserHistory } from 'react-router'

export const setSignedInUser = (user) =>  ({ type: 'AUTH_LOGGED_IN', user: user });

export const loginGithub = (code, statStr, dispatch, state) => {
  const params = {
    code: code,
    state: statStr,
    provider: 'github',
    redirect_uri: API.get_callback_url() + '/callback'
  };
  const url = `${API.get_api_url()}/auth`;
  const method = 'POST';
  API.send_request(url, method, params, true)
  .then(function(user) {
    user.provider = 'github';
    user.providerName = 'GitHub';
    dispatch(setSignedInUser(user));
  })
  .catch(function(err) {
    alert(err);
  });
}

export const loginGoogle = (googleUser, dispatch, state) => {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token)
  const params = {
    id_token: id_token,
    provider: 'google'
  };
  const url = `${API.get_api_url()}/auth`;
  const method = 'POST';
  API.send_request(url, method, params, true)
  .then(function(user) {
    user.provider = 'google';
    user.providerName = 'Google';
    dispatch(setSignedInUser(user));
  })
  .catch(function(err) {
    alert(err);
  });
}

export const setUser = (user, dispatch, state) => {
  dispatch(setSignedInUser(user));
}

export const signOut = (dispatch, state) => {
  const loginUser = JSON.parse(sessionStorage.getItem('login_user'));
  if (loginUser.provider == 'google') {
    var win = window.open('https://www.google.com/accounts/Logout', '_logout', 'width=500,height=600');
    var timer = setInterval(function() {
      if (win.closed) {
        dispatch({ type: 'AUTH_LOGGED_OUT'});
        clearInterval(timer);
        location.reload();
      }
    }, 500);
  }
  else if (loginUser.provider == 'github') {
    dispatch({ type: 'AUTH_LOGGED_OUT'});
    clearInterval(timer);
    location.reload();
  }
}
