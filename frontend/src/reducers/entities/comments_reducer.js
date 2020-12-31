import { toHashById } from '../../util/data_util';
import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
  RECEIVE_USER_COMMENTS,
  REMOVE_COMMENT,
} from '../../actions/comment_actions';
import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT,
} from '../../actions/project_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return toHashById(action.comments);

    case RECEIVE_USER_COMMENTS:
      return toHashById(action.comments);

    case RECEIVE_COMMENT:
      return Object.assign({}, state, { [action.comment._id]: action.comment });

    case REMOVE_COMMENT:
      let newState = Object.assign({}, state);
      delete newState[action.commentId];
      return newState;

    case RECEIVE_PROJECTS:
    case RECEIVE_PROJECT:
      if (action.payload.comments === 'ignore') return state;
      return toHashById(action.payload.comments);

    default:
      return state;
  }
};
