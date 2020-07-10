
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { search } from '../../redux/actions/invited_user'
import InvitedUserAddContainer from './InvitedUserAddContainer'

class InvitedUserListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.search();
  }

  render() {
    const { props:{list} } = this;

    return (
      <div>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Is Admin</th>
              <th>Invited By</th>
              <th>Invited At</th>
              <th>State</th>
              <th></th>
            </tr>
            {
              list.map(user =>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role_name}</td>
                  <td>{user.is_admin}</td>
                  <td>{user.invited_by_email}</td>
                  <td>{user.invited_at}</td>
                  <td>{user.state}</td>
                  <td></td>
                </tr>
              )
            }
            <InvitedUserAddContainer/>
          </tbody>
        </table>
      </div>
    );
  }
}

InvitedUserListContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    email: React.PropTypes.string.isRequired,
    role_id: React.PropTypes.string.isRequired,
    is_admin: React.PropTypes.number.isRequired,
    invited_by: React.PropTypes.string.isRequired,
    invited_at: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
    invited_by_email: React.PropTypes.string.isRequired,
    role_name: React.PropTypes.string.isRequired
  }).isRequired).isRequired
}

function mapDispatchToProps(dispatch){
  return {
    search: () => dispatch(search.bind(null)),
  }
}

export default connect(
  (state) =>({
    list: state.invited_user.list
  }),
  mapDispatchToProps
)(InvitedUserListContainer)
