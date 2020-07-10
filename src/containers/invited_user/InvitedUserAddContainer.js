
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { findRoles, inviteNewUser } from '../../redux/actions/invited_user'

class InvitedUserAddContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role_id: '',
      role_name: '',
      is_admin: ''
    };
  }

  componentDidMount() {
    this.props.findRoles();
  }

  render() {

    const { state: {
              email,
              role_id,
              role_name,
              is_admin
            },
            props: {
              roleList
            }} = this;

    const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
        [name]: value
      });
    }

    const onOptionChange = (event) => {
      this.setState({role_id: event.target.value, role_name: event.target.options[event.target.selectedIndex].text});
    }

    const onAdd = (event) => {
      event.preventDefault();
      this.props.inviteNewUser(this.state);
      this.setState({
        email: '',
        role_id: '',
        role_name: '',
        is_admin: ''
      });
    }

    return (
      <tr>
        <td></td>
        <td>
          <input name="email" value={email} style={{ width: '260px' }} onChange={ onChange } />
        </td>
        <td>
          <select name="role_id" value={role_id} onChange={ onOptionChange } >
            <option value="">Select role...</option>
            {
              roleList.map(role => {
                const { id, name } = role;
                return(<option key={id} value={id}>{name}</option>)
              })
            }
          </select>
        </td>
        <td>
          <select name="is_admin" value={is_admin} onChange={ onChange } >
            <option value="">Select ...</option>
            <option value="1">True</option>
            <option value="0">False</option>
          </select>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <button className="small" onClick={ onAdd }>Invite New</button>
        </td>
      </tr>
    );
  }
};

function mapDispatchToProps(dispatch){
  return {
    findRoles: (state) => dispatch(findRoles.bind(null)),
    inviteNewUser: (state) => dispatch(inviteNewUser.bind(null, state))
  }
}

export default connect(
  (state) =>({
    roleList: state.invited_user.roleList
  }),
  mapDispatchToProps
)(InvitedUserAddContainer)
