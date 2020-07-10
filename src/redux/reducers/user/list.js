export default (state = [], action) => {
  switch (action.type) {
    case 'USER_SEARCH_LOADED':
      return action.list
    default:
      return state
  }
}
