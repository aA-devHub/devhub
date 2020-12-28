import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

// BEGIN testing
import * as sessionActions from './actions/session_actions';
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

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);

  // BEGIN testing
  window.actions = sessionActions;
  window.store = store;
  // END testing
});
