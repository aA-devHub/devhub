import { toHashById } from '../../util/data_util';
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  REMOVE_MESSAGE,
} from '../../actions/message_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, { [action.message._id]: action.message });

    case RECEIVE_MESSAGES:
      return toHashById(action.messages);

    case REMOVE_MESSAGE:
      let newState = Object.assign({}, state);
      delete newState[action.message._id];
      return newState;

    default:
      return state;
  }
};
