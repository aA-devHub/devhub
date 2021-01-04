import { combineReducers } from 'redux';

import users from './entities/users_reducer';
import projects from './entities/projects_reducer';
import comments from './entities/comments_reducer';
import messages from './entities/messages_reducer';
import conversations from './entities/conversations_reducer';
import languages from './entities/languages_reducer';

export default combineReducers({
  users,
  projects,
  comments,
  messages,
  conversations,
  languages,
});
