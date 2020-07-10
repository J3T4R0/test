
import API from '../../utilities/api';

export const setList = (list) =>  ({ type: 'INVITED_USER_SEARCH_LOADED', list });
export const setRoleList = (list) =>  ({ type: 'INVITED_USER_ROLE_SEARCH_LOADED', list });

export const search = (dispatch, state) => {
  dispatch( {type: 'INVITED_USER_SEARCH_LOADING'} );
  const apiUrl = `${API.get_api_url()}/invited_user`;
  const method = 'GET';
  const params = {};
  API.send_request(apiUrl, method, params).
  then(data => {
    if (Array.isArray(data)) {
      dispatch(setList(data));
    }
    else {
      alert("Failed to find invited users");
      dispatch(setList([]));
    }
  })
  .catch(err => {
    alert(err);
    dispatch(setList([]));
  });
}

export const findRoles = (dispatch, state) => {
  var apiUrl = `${API.get_api_url()}/role`;
  const method = 'GET';
  const params = {};
  API.send_request(apiUrl, method, params).
  then(data => {
    dispatch(setRoleList(data));
  })
  .catch(err => {
    alert(err);
    dispatch(setRoleList([]));
  });
}

export const inviteNewUser = (newUser, dispatch, state) => {
  const {
    email,
    role_id,
    role_name,
    is_admin
  } = newUser;
  if (email == '') {
    alert("'email' is missing");
    return;
  }
  if (role_id == '') {
    alert("Please select a role");
    return;
  }
  if (is_admin == '') {
    alert("Please select if this user is an admin in the role or not");
    return;
  }
  const apiUrl = `${API.get_api_url()}/invited_user`;
  const method = 'POST';
  const params = {
    role_id: role_id,
    email: email,
    is_admin: is_admin
  };
  API.send_request(apiUrl, method, params).
  then(data => {
    if (data) {
      alert("Successfully invited a new user");
      //newUser.id = data;
      dispatch({ type: 'INVITED_USER_ADDED', newUser });
    }
    else {
      alert("Failed to invite a new user");
      dispatch({ type: 'INVITED_USER_ADDED' });
    }
  })
  .catch(err => {
    alert(err);
    dispatch({ type: 'INVITED_USER_ADDED' });
  });
}
