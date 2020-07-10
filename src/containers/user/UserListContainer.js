
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { search, deleteSystem } from '../../redux/actions/user'

class UserListContainer extends Component {
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
            <th>Name</th>
            </tr>
            {
              list.map(user =>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

UserListContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    family_name: React.PropTypes.string.isRequired,
    given_name: React.PropTypes.string.isRequired
  }).isRequired).isRequired
}

function mapDispatchToProps(dispatch){
   return {
     search: () => dispatch(search.bind(null))
   }
}

export default connect(
  (state) =>({
    list: state.user.list
  }),
  mapDispatchToProps
)(UserListContainer)
