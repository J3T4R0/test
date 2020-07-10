
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { search, findRoles } from '../../redux/actions/role_user'

class RoleUserRoleListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      role_id: ''
    };
  }

  componentDidMount() {
    this.props.findRoles();
  }

  render() {
    const {state:{role_id}, props:{list, search}} = this;

    const onSearch= (e) =>  {
      e.preventDefault()
      search(role_id);
    }

    return (
      <span>
        <select name="role" value={role_id} onChange={ (e)=>this.setState({role_id: e.target.value}) } >
          <option value="">Select role...</option>
        {
          list.map(role => {
            const { id, name } = role;
            return(<option key={id} value={id}>{name}</option>)
          })
        }
        </select>
        &nbsp;&nbsp;
        <button className="small" onClick={ onSearch }>submit</button>
      </span>
    );
  }
};

function mapDispatchToProps(dispatch){
  return {
    findRoles: () => dispatch(findRoles.bind(null)),
    search: (role_id) => dispatch(search.bind(null, role_id))
  }
}

export default connect(
  (state) =>({
    list: state.role_user.roleList
  }),
  mapDispatchToProps
)(RoleUserRoleListContainer)
