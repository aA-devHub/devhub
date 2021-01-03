import * as ConversationAPI from '../util/conversation_api_util';

export const RECEIVE_CONVERSATION = 'RECEIVE_CONVERSATION';
export const RECEIVE_CONVERSATIONS = 'RECEIVE_CONVERSATIONS';
export const RECEIVE_CONVERSATION_ERRORS = 'RECEIVE_CONVERSATION_ERRORS';
export const CLEAR_CONVERSATION_ERRORS = 'CLEAR_CONVERSATION_ERRORS';

export const clearConversationErrors = () => ({
  type: CLEAR_CONVERSATION_ERRORS,
});

export const receiveConversationErrors = (errors) => ({
  type: RECEIVE_CONVERSATION_ERRORS,
  errors,
});

export const receiveConversation = (payload) => ({
  type: RECEIVE_CONVERSATION,
  payload,
});

export const receiveConversations = (conversations) => ({
  type: RECEIVE_CONVERSATIONS,
  conversations,
});

// Populate the users slice with users that the current user is engaged with
export const fetchConversations = (filter) => (dispatch) => {
  return ConversationAPI.fetchConversations(filter)
    .then((conversations) => dispatch(receiveConversations(conversations.data)))
    .catch((errors) =>
      dispatch(receiveConversationErrors(errors.response.data))
    );
};

export const fetchConversation = (conversationId) => (dispatch) => {
  return ConversationAPI.fetchConversation(conversationId)
    .then((payload) => dispatch(receiveConversation(payload.data)))
    .catch((errors) =>
      dispatch(receiveConversationErrors(errors.response.data))
    );
};