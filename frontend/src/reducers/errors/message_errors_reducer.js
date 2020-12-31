import {
  RECEIVE_MESSAGE_ERRORS,
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  CLEAR_MESSAGE_ERRORS,
} from '../../actions/message_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MESSAGE_ERRORS:
      return action.errors;

    case RECEIVE_MESSAGES:
    case RECEIVE_MESSAGE:
    case CLEAR_MESSAGE_ERRORS:
      return [];

    default:
      return state;
  }
};
