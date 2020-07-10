
import React from 'react';

const Auth = ({ githubSignInHandler }) => (
  <div className="containter">
    <h3 className="text-left">Please Log In using your preference.</h3>
    <p/>
    <div className='g-signin2' id='signin2' data-theme='dark'/>
    <p/>
    <div><input type="button" className="btn btn-primary btn-lg" onClick={githubSignInHandler} value="GitHub Auth"/></div>
  </div>
);

Auth.propTypes = {
  githubSignInHandler: React.PropTypes.func.isRequired
};

export default Auth;
