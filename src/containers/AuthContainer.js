
import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { loginGoogle, setUser } from '../redux/actions/auth'
import Auth from '../components/Auth'
import API from '../utilities/api';

class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderGoogleLoginButton(signInHanler) {
    console.log('rendering google signin button');
    gapi.signin2.render('signin2', {
      'scope': 'profile',
      'width': 130,
      'height': 40,
      'longtitle': false,
      'theme': 'dark',
      'onsuccess': signInHanler,
      'onfailure': function() {}
    })
  }

  componentDidMount() {
    const self = this;
    const {props:{loginGoogle}} = this;
    window.addEventListener('google-loaded', function(){self.renderGoogleLoginButton(loginGoogle)});
  }

  render() {

    const { props:{loginUser, setUser} } = this;
    if (!loginUser || !loginUser.access_token) {
      if (sessionStorage.getItem('access_token')) {
        setUser(JSON.parse(sessionStorage.getItem('login_user')));
      }
    }
    else {
      browserHistory.push('/');
    }

    const handleGithubButton = (e) => {
      e.preventDefault();
      window.location = API.get_github_auth_url();
    }

    return (<Auth
      githubSignInHandler={handleGithubButton}
    />);
  }
}

function mapDispatchToProps(dispatch){
  return {
    setUser: (user) => dispatch(setUser.bind(null, user)),
    loginGoogle: (googleUser) => dispatch(loginGoogle.bind(null, googleUser))
  }
}

export default connect( (state) =>({
    loginUser: state.auth.loginUser
  }),
  mapDispatchToProps
)(AuthContainer)
