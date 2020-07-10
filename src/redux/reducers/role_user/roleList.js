export default (state = [], action) => {
  switch (action.type) {
    case 'ROLE_USER_ROLE_SEARCH_LOADED':
      return action.list
    case 'ROLE_USER_ROLE_ADDED':
      if (action.newRole) {
        return [
          ...state,
          action.newRole
        ];
      }
      else {
        return state;
      }
    default:
      return state
  }
}
