import { toHashById } from '../../util/data_util';
import {
  RECEIVE_PROJECTS,
  RECEIVE_USER_PROJECTS,
  RECEIVE_PROJECT,
  REMOVE_PROJECT,
} from '../../actions/project_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PROJECTS:
      return toHashById(action.projects);

    case RECEIVE_PROJECT:
      return Object.assign({}, state, { [action.project._id]: action.project });

    case REMOVE_PROJECT:
      let newState = Object.assign({}, state);
      debugger;
      delete newState[action.project._id];
      return newState;

    default:
      return state;
  }
};
