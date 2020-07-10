
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { signOut } from '../redux/actions/auth'
import App from '../components/App';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { props:{loginUser} } = this;
    if (!loginUser || !loginUser.access_token) {
      browserHistory.push('/auth');
    }
}

  render() {
    const { props:{children, loginUser, signOut} } = this;
    return (<App
      children={children}
      loginUser={loginUser}
      signOutHanler={signOut}
    />);
  }
}

function mapDispatchToProps(dispatch){
  return {
    signOut: () => dispatch(signOut.bind(null))
  }
}

export default connect( (state) =>({
    loginUser: state.auth.loginUser,
    lastUrl: state.auth.lastUrl
  }),
  mapDispatchToProps
)(AppContainer)
