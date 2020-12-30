import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN,
} from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { currentUserDetails } from '../util/user_api_util';

const initialState = {
  isAuthenticated: false,
  user: undefined,
};

export default (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER:
      if (state.user && state.user.id === action.user._id) {
        // console.log('update user ', action.user);
        return {
          ...state,
          user: currentUserDetails(action.user),
        };
      }
      return state;

    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };

    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };

    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };

    default:
      return state;
  }
};
