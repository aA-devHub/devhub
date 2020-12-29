import { combineReducers } from 'redux';
import users from './entities/users_reducer';
import projects from './entities/projects_reducer';

export default combineReducers({
  users,
  projects,
});
