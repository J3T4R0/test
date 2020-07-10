export default (state = [], action) => {
  switch (action.type) {
    case 'INVITED_USER_SEARCH_LOADED':
      return action.list
    case 'INVITED_USER_ADDED':
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
