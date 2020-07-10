
import React, {Component } from 'react'
import { connect } from 'react-redux'
import RoleUserRoleListContainer from '../containers/role_user/RoleUserRoleListContainer'
import RoleUserRoleAddContainer from '../containers/role_user/RoleUserRoleAddContainer'
import RoleUserListContainer from '../containers/role_user/RoleUserListContainer'

class RoleUserMainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <div>
          <RoleUserRoleListContainer/>
          <RoleUserRoleAddContainer/>
        </div>
        <br/>
        <RoleUserListContainer/>
      </div>
    );
  }
}

export default connect(
  (state) =>({
  }),
  null
)(RoleUserMainContainer)
