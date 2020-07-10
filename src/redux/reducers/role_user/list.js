export default (state = [], action) => {
  switch (action.type) {
    case 'ROLE_USER_SEARCH_LOADED':
      return action.list
    case 'ROLE_USER_ADDED':
      if (action.newUser) {
        return [
          ...state,
          action.newUser
        ];
      }
      else {
        return state;
      }
    default:
      return state
  }
}
