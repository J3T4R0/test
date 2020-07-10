
import { combineReducers } from 'redux'
import {routerReducer } from 'react-router-redux'

import authLoginUser from './auth/login'
import userList from './user/list'
import roleUserList from './role_user/list'
import roleUserRoleList from './role_user/roleList'
import roleUserUserList from './role_user/userList'
import roleUserSelectedRole from './role_user/selectedRole'
import invitedUserList from './invited_user/list'
import invitedUserRoleList from './invited_user/roleList'

export default combineReducers({
  auth: combineReducers({
    loginUser: authLoginUser,
  }),
  user: combineReducers({
      list: userList
  }),
  role_user: combineReducers({
      list: roleUserList,
      roleList: roleUserRoleList,
      userList: roleUserUserList,
      selectedRole: roleUserSelectedRole
  }),
  invited_user: combineReducers({
      list: invitedUserList,
      roleList: invitedUserRoleList
  }),
  routing: routerReducer
})
