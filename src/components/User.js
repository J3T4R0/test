
import React, {Component } from 'react'
import { connect } from 'react-redux'
import UserListContainer from '../containers/user/UserListContainer'

class UserMainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <UserListContainer/>
      </div>
    );
  }
}

export default connect(
  (state) =>({
  }),
  null
)(UserMainContainer)
