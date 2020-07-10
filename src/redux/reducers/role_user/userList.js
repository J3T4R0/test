export default (state = [], action) => {
  switch (action.type) {
    case 'ROLE_USER_USER_SEARCH_LOADED':
      return action.list
    default:
      return state
  }
}
