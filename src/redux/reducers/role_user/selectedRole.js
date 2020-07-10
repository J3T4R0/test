
export default (state = {id:'', name:''}, action) => {
  switch (action.type) {
    case 'ROLE_USER_ROLE_SELECTED':
      return action.role
    default:
      return state
  }
}
