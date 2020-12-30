import { toHashById } from '../../util/data_util';
import { RECEIVE_USERS, RECEIVE_USER } from '../../actions/user_actions';
import { RECEIVE_PROJECTS } from '../../actions/project_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USERS:
      return toHashById(action.users);

    case RECEIVE_USER:
      return Object.assign({}, state, { [action.user._id]: action.user });

    case RECEIVE_PROJECTS:
      return toHashById(action.payload.users);

    default:
      return state;
  }
};
