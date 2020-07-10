
import React, {Component } from 'react'
import { connect } from 'react-redux'
import InvitedUserListContainer from '../containers/invited_user/InvitedUserListContainer'

class InvitedUserMainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <InvitedUserListContainer/>
      </div>
    );
  }
}

export default connect(
  (state) =>({
  }),
  null
)(InvitedUserMainContainer)
