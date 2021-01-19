import { toHashById } from '../../util/data_util';
import { RECEIVE_FEATURED } from '../../actions/project_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FEATURED:
      return toHashById(action.projects);

    default:
      return state;
  }
};
