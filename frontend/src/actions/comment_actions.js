import * as CommentAPI from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_USER_COMMENTS = 'RECEIVE_USER_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';

export const clearCommentErrors = () => ({
  type: CLEAR_COMMENT_ERRORS,
});

export const receiveCommentErrors = (errors) => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors,
});

export const removeComment = (comment) => ({
  type: REMOVE_COMMENT,
  comment,
});

export const receiveUserComments = (comments) => ({
  type: RECEIVE_USER_COMMENTS,
  comments,
});

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});
export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const fetchComments = (filter) => (dispatch) => {
  return CommentAPI.fetchComments({ filter })
    .then((comments) => dispatch(receiveComments(comments.data)))
    .catch((errors) => receiveCommentErrors(errors.response));
};

export const fetchUserComments = (userId) => (dispatch) => {
  return CommentAPI.fetchUserComments(userId)
    .then((comments) => dispatch(receiveUserComments(comments.data)))
    .catch((errors) => receiveCommentErrors(errors.response.data));
};

export const fetchProjectComments = (projectId) => (dispatch) => {
  return CommentAPI.fetchProjectComments(projectId)
    .then((comments) => dispatch(receiveUserComments(comments)))
    .catch((errors) => receiveCommentErrors(errors.response.data));
};

export const fetchComment = (commentId) => (dispatch) => {
  return CommentAPI.fetchComment(commentId)
    .then((comment) => dispatch(receiveComment(comment.data)))
    .catch((errors) => receiveCommentErrors(errors.response.data));
};

export const createComment = (data) => (dispatch) => {
  return CommentAPI.createComment(data)
    .then((comment) => dispatch(receiveComment(comment.data)))
    .catch((errors) => receiveCommentErrors(errors.response.data));
};

export const deleteComment = (commentId) => (dispatch) => {
  return CommentAPI.deleteComment(commentId).then((comment) =>
    dispatch(removeComment(comment.data))
  );
};

export const updateComment = (comment) => (dispatch) => {
  return CommentAPI.updateComment(comment)
    .then((res) => dispatch(receiveComment(res.data)))
    .catch((errors) => dispatch(receiveCommentErrors(errors.response.data)));
};
