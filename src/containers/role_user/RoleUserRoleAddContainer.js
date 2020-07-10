
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addRole } from '../../redux/actions/role_user'

class RoleUserRoleAddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role_name: ''
    };
  }

  render() {

    const onAdd = (event) => {
      event.preventDefault();
      const { state: {role_name}, props:{roleList} } = this;
      if (roleList.filter( role => role.name == role_name).length > 0) {
        alert("This role already exists");
        return;
      }
      this.props.addRole(role_name);
      this.setState({
        role_name: ''
      });
    }

    const { state: {role_name} } = this;
    return (
      <span style={{"marginLeft":"150px"}}>
        <input name="role_name" placeholder="Name" value={role_name} onChange={ (e)=>this.setState({role_name: e.target.value}) } />
        &nbsp;&nbsp;
        <button className="small" onClick={ onAdd }>Add New</button>
      </span>
    );
  }
};

function mapDispatchToProps(dispatch){
  return {
    addRole: (role_name) => dispatch(addRole.bind(null, role_name))
 }
}

export default connect(
  (state) =>({
    roleList: state.role_user.roleList
  }),
  mapDispatchToProps
)(RoleUserRoleAddContainer)
