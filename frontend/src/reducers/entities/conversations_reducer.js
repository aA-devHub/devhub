import {
  RECEIVE_CONVERSATION,
  RECEIVE_CONVERSATIONS,
} from '../../actions/conversation_actions';
import { RECEIVE_MESSAGE } from '../../actions/message_actions';
import { toHashById } from '../../util/data_util';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MESSAGE:
      const { conversation } = action.payload;
      return Object.assign({}, state, { [conversation._id]: conversation });

    case RECEIVE_CONVERSATION:
      return Object.assign({}, state, {
        [action.payload.conversation._id]: action.payload.conversation,
      });

    case RECEIVE_CONVERSATIONS:
      return toHashById(action.conversations);

    default:
      return state;
  }
};
