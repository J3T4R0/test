
import React from 'react';
import { render } from 'react-dom';
import AppContainer from './containers/AppContainer';
import AuthContainer from './containers/AuthContainer';
import CallbackContainer from './containers/CallbackContainer';
import User from './components/User';
import RoleUser from './components/RoleUser';
import InvitedUser from './components/InvitedUser';
import store from './redux/store/config'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
    //<ReactReduxContext.Consumer>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={User}/>
        <Route path="auth" component={AuthContainer} />
        <Route path="callback" component={CallbackContainer} />
        <Route path="users" component={User} />
        <Route path="roleUsers" component={RoleUser} />
        <Route path="invitedUsers" component={InvitedUser} />
      </Route>
    </Router>
  //</ReactReduxContext.Consumer>,
    </Provider>, 
  document.getElementById('content')
);
