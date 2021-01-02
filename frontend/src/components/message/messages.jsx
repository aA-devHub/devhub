import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import ConversationPanel from './conversation_panel';

const Messages = ({ history }) => {
  return (
    <>
      <div className="user-header">
        <div className="icon-overlay">
          <div className="back-icon pointer" onClick={() => history.goBack()}>
            <ArrowBackIosIcon />
          </div>

          <h1>Messages</h1>
        </div>
      </div>

      <ConversationPanel />
    </>
  );
};

export default Messages;
