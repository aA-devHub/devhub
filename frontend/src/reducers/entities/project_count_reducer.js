import { RECEIVE_PROJECT_COUNT } from '../../actions/project_actions';
const _initState = {};

export default (state = _initState, action) => {
  switch (action.type) {
    case RECEIVE_PROJECT_COUNT:
      return action.payload;
    default:
      return state;
  }
};
