import { combineReducers } from 'redux';

import session from './errors/session_errors_reducer';
import comments from './errors/comment_errors_reducer';
import projects from './errors/project_errors_reducer';
import users from './errors/user_errors_reducer';
import messages from './errors/message_errors_reducer';
import conversations from './errors/conversation_errors_reducer';

export default combineReducers({
  session,
  comments,
  projects,
  users,
  messages,
  conversations,
});
