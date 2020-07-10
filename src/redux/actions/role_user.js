
import API from '../../utilities/api';

export const setList = (list) =>  ({ type: 'ROLE_USER_SEARCH_LOADED', list });
export const setRoleList = (list) =>  ({ type: 'ROLE_USER_ROLE_SEARCH_LOADED', list });
export const setUserList = (list) =>  ({ type: 'ROLE_USER_USER_SEARCH_LOADED', list });

export const search = (role_id, dispatch, state) => {
  dispatch( {type: 'ROLE_USER_SEARCH_LOADING'} );
  dispatch( {type: 'ROLE_USER_ROLE_SELECTED', role: {id: role_id, name: ''}} );
  const apiUrl = `${API.get_api_url()}/user?role_id=${role_id}`;
  const method = 'GET';
  const params = {};
  API.send_request(apiUrl, method, params).
  then(data => {
    if (Array.isArray(data)) {
      dispatch(setList(data));
    }
    else {
      alert("Failed to find users");
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

export const findUsers = (dispatch, state) => {
  var apiUrl = `${API.get_api_url()}/user`;
  const method = 'GET';
  const params = {};
  API.send_request(apiUrl, method, params).
  then(data => {
    dispatch(setUserList(data));
  })
  .catch(err => {
    alert(err);
    dispatch(setUserList([]));
  });
}

export const addRole = (role_name, dispatch, state) => {
  if (role_name == '') {
    alert("'name' is missing");
    return;
  }
  var apiUrl = `${API.get_api_url()}/role`;
  const method = 'POST';
  const params = {
    name: role_name
  };
  API.send_request(apiUrl, method, params).
  then(data => {
    if (data) {
      alert("Successfully created a role '" + role_name + "'");
      const newRole = {
        id: data,
        name: role_name
      };
      dispatch({ type: 'ROLE_USER_ROLE_ADDED', newRole });
    }
    else {
      alert("Failed to add a new user");
      dispatch({ type: 'ROLE_USER_ROLE_ADDED' });
    }
  })
  .catch(err => {
    alert(err);
    dispatch({ type: 'ROLE_USER_ROLE_ADDED' });
  });
}

export const addUser = (user_id, user_email, role_id, role_name, is_admin, dispatch, state) => {
  if (role_id == '') {
    alert("Please select a role");
    return;
  }
  if (user_id == '') {
    alert("Please select a user");
    return;
  }
  if (is_admin == '') {
    alert("Please select if this user is an admin in the role or not");
    return;
  }
  var apiUrl = `${API.get_api_url()}/user`;
  const method = 'POST';
  const params = {
    user_id: user_id,
    role_id: role_id,
    is_admin: is_admin
  };
  API.send_request(apiUrl, method, params).
  then(data => {
    if (data) {
      alert("Successfully requested to add '" + user_email + "' in role '" + role_name + "'");
      const newUser = {
        id: user_id,
        email: user_email,
        is_admin: is_admin
      };
      dispatch({ type: 'ROLE_USER_ADDED', newUser });
    }
    else {
      alert("Failed to add a new user");
      dispatch({ type: 'ROLE_USER_ADDED' });
    }
  })
  .catch(err => {
    alert(err);
    dispatch({ type: 'ROLE_USER_ADDED' });
  });
}
