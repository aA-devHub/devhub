import { toHashById } from '../../util/data_util';
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  REMOVE_MESSAGE,
} from '../../actions/message_actions';
import { RECEIVE_CONVERSATION } from '../../actions/conversation_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MESSAGE:
      const { message } = action.payload;
      return Object.assign({}, state, { [message._id]: message });

    case RECEIVE_CONVERSATION:
      return toHashById(action.payload.messages);

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
