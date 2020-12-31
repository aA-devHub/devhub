import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

// BEGIN testing
import * as sessionActions from './actions/session_actions';
import * as userActions from './actions/user_actions';
import * as projectActions from './actions/project_actions';
import * as commentActions from './actions/comment_actions';
import * as messageActions from './actions/message_actions';
// END testing

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's info
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    // If token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to login
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    // First time user, start w/ empty store
    store = configureStore();
  }

  class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        console.log('here');
        window.scrollTo(0, 0);
      }
    }
    render() {
      return this.props.children;
    }
  }

  const root = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </Provider>,
    root
  );

  // BEGIN testing
  window.sessionActions = sessionActions;
  window.userActions = userActions;
  window.projectActions = projectActions;
  window.commentActions = commentActions;
  window.messageActions = messageActions;
  window.store = store;

  // return the current user if logged in, fetching user data if necessary
  // let curr = await currentUser();
  window.currentUser = function () {
    const state = store.getState();
    if (!state.session.user) return null;

    const userId = state.session.user.id;
    return (
      state.entities.users[userId] ||
      store.dispatch(userActions.fetchUser(userId))
    );
  };
  // END testing
});
