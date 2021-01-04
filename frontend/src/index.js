import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import App from './components/app';
import ScrollHelper from './scroll_helper';
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
import * as tagActions from './actions/tag_actions';
import * as searchActions from './actions/search_actions';
import * as notificationActions from './actions/notification_actions';
import * as conversationActions from './actions/conversation_actions';
import * as gh from './util/github_api';
import moment from 'moment';
// END testing

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // Create a preconfigured state we can immediately add to our store
  let preloadedState = {};

  // Load any tags used for current search filtering
  if (localStorage.tags) {
    preloadedState = {
      ...preloadedState,
      ui: {
        tags: JSON.parse(localStorage.getItem('tags')),
      },
    };
  }

  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's info
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const notifications = { messages: 0, other: [] };

    preloadedState = {
      ...preloadedState,
      session: { isAuthenticated: true, user: decodedUser, notifications },
    };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    // If token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to login
      store.dispatch(logout());
    }
  } else {
    // First time user, start w/ empty store
    store = configureStore();
  }

  const root = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <ScrollHelper>
            <App />
          </ScrollHelper>
        </Router>
      </MuiPickersUtilsProvider>
    </Provider>,
    root
  );

  // BEGIN testing
  window.sessionActions = sessionActions;
  window.userActions = userActions;
  window.projectActions = projectActions;
  window.commentActions = commentActions;
  window.messageActions = messageActions;
  window.tagActions = tagActions;
  window.searchActions = searchActions;
  window.notificationActions = notificationActions;
  window.conversationActions = conversationActions;
  window.gh = gh;

  window.moment = moment;
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
