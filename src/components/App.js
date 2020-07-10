
import React from 'react'
import { Link, browserHistory } from 'react-router'

export default function App({ children, loginUser, signOutHanler }) {

  let userStr = "";
  let signOutStr = "";
  if (loginUser.email) {
    userStr = loginUser.email + ' by ' + loginUser.providerName;
    signOutStr = "Sign Out";
  }

  return (
    <div className="containter">
      <header>
        <h3>Porper</h3>
        <Link to="/users">Users</Link>
        <Link to="/roleUsers">RoleUsers</Link>
        <Link to="/invitedUsers">Invited Users</Link>
      </header>
      <section className="text-right">
        { userStr }<br/><a href="#" onClick={ signOutHanler } >{signOutStr}</a>
      </section>
      <section>
        {children ||
          <div className='center-block'>
            <h1>Porper</h1>
            <p/>
            <div>
            Login As : { loginUser.email }<br/>
            </div>
            <p/>
            <div>
              <a href="#" onClick={ signOutHanler } >Sign Out</a>
            </div>
          </div>
        }
      </section>
    </div>
  )
}
