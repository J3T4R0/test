
import API from '../../utilities/api';

export const setList = (list) =>  ({ type: 'USER_SEARCH_LOADED', list });

export const search = (dispatch, state) => {
  dispatch( {type: 'USER_SEARCH_LOADING'} );
  const apiUrl = `${API.get_api_url()}/user`;
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
