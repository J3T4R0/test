export default (state = [], action) => {
  switch (action.type) {
    case 'INVITED_USER_ROLE_SEARCH_LOADED':
      return action.list
    default:
      return state
  }
}
