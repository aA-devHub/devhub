import {
  RECEIVE_CONVERSATION_ERRORS,
  CLEAR_CONVERSATION_ERRORS,
  RECEIVE_CONVERSATIONS,
  RECEIVE_CONVERSATION,
} from '../../actions/conversation_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CONVERSATION_ERRORS:
      return action.errors;

    case CLEAR_CONVERSATION_ERRORS:
    case RECEIVE_CONVERSATIONS:
    case RECEIVE_CONVERSATION:
      return [];

    default:
      return state;
  }
};
