
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RoleUserUserAddContainer from './RoleUserUserAddContainer'

class RoleUserListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { props:{list} } = this;

    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Email Address</th>
            <th>Is Admin</th>
            <th>Name</th>
          </tr>
          {
            list.map(user =>
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.is_admin}</td>
                <td>{user.name}</td>
              </tr>
            )
          }
          <RoleUserUserAddContainer/>
        </tbody>
      </table>
    );
  }
};

RoleUserListContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    family_name: React.PropTypes.string.isRequired,
    given_name: React.PropTypes.string.isRequired,
    is_admin: React.PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default connect(
  (state) =>({
    list: state.role_user.list
  }),
  null
)(RoleUserListContainer)
