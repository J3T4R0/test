
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { findUsers, addUser } from '../../redux/actions/role_user'

class RoleUserUserAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      user_email: '',
      is_admin: ''
    };
  }

  componentDidMount() {
    this.props.findUsers();
  }

  render() {

    const onUserOptionChange = (event) => {
      this.setState({user_id: event.target.value, user_email: event.target.options[event.target.selectedIndex].text});
    }

    const onAdd = (event) => {
      event.preventDefault();
      const { state: {user_id, user_email, is_admin}, props:{list, selectedRole} } = this;
      if (list.filter( user => user.id == user_id).length > 0) {
        alert("This user is already in this group");
        return;
      }
      this.props.addUser(user_id, user_email, selectedRole.id, selectedRole.name, is_admin);
      this.setState({
        user_id: '',
        user_email: '',
        is_admin: ''
      });
    }

    const { state: {user_id, user_email, is_admin}, props:{userList} } = this;
    return (
      <tr>
        <td></td>
        <td>
          <select name="user_id" value={user_id} onChange={ onUserOptionChange } >
            <option value="">Select user...</option>
            {
              userList.map(user => {
                const { id, email } = user;
                return(<option key={id} value={id}>{email}</option>)
              })
            }
          </select>
        </td>
        <td>
          <select name="is_admin" value={is_admin} onChange={ (e)=>this.setState({is_admin: e.target.value}) } >
            <option value="">Select ...</option>
            <option value="1">True</option>
            <option value="0">False</option>
          </select>
        </td>
        <td>
          <button className="small" onClick={ onAdd }>Add New</button>
        </td>
      </tr>
    );
  }
};

function mapDispatchToProps(dispatch){
  return {
    findUsers: () => dispatch(findUsers.bind(null)),
    addUser: (user_id, user_email, role_id, role_name, is_admin) => dispatch(addUser.bind(null, user_id, user_email, role_id, role_name, is_admin))
  }
}

export default connect(
  (state) =>({
    list: state.role_user.list,
    userList: state.role_user.userList,
    selectedRole: state.role_user.selectedRole
  }),
  mapDispatchToProps
)(RoleUserUserAddContainer)
