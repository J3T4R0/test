
import React, {Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { loginGithub } from '../redux/actions/auth'

class CallbackContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { props:{location:{query:{code, state}}} } = this;
    this.props.loginGithub(code, state);
  }

  render() {
    return <div/>;
  }
}

function mapDispatchToProps(dispatch){
  return {
    loginGithub: (code, stateStr) => dispatch(loginGithub.bind(null, code, stateStr))
  }
}

export default connect( (state) =>({
  }),
  mapDispatchToProps
)(CallbackContainer)
