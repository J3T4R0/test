
export default (state = {
                  user_id: null,
                  email: null,
                  access_token: null,
                  last_url: null
                }, action) => {
  switch (action.type) {
    case 'AUTH_LOGGED_IN':
      const {user} = action;
      state = Object.assign({}, user);
      state.last_url = window.location;
      sessionStorage.setItem('login_user', JSON.stringify(state));  // this is for refresh
      sessionStorage.setItem('access_token', user.access_token);
      return state;
    case 'AUTH_LOGGED_OUT':
      const loginUser = {
        user_id: null,
        email: null,
        access_token: null,
        last_url: null
      };
      sessionStorage.removeItem('access_token');
      sessionStorage.setItem('login_user', JSON.stringify(loginUser));  // this is for refresh
      return loginUser;
    default:
      return state
  }
}
