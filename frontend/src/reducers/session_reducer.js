import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN,
} from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_NOTIFICATIONS } from '../actions/notification_actions';
import { currentUserDetails } from '../util/user_api_util';
import { RECEIVE_FAVORITES } from '../actions/project_actions';

const initialState = {
  isAuthenticated: false,
  user: undefined,
  notifications: {},
};

export default (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FAVORITES:
      const { favorites } = action;
      return { ...state, user: { ...state.user, favorites: favorites } };

    case RECEIVE_USER:
      const { user } = action.payload;
      if (state.user && state.user.id === user._id) {
        return {
          ...state,
          user: currentUserDetails(user),
        };
      }
      return state;

    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
        notifications: action.currentUser.notifications,
      };

    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
        notifications: {},
      };

    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };

    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.user.notifications,
        user: action.user,
      };

    default:
      return state;
  }
};
