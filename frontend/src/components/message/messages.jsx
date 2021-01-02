import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Messages = ({ history }) => {
  return (
    <>
      <div className="message-header">
        <div className="icon-overlay">
          <div className="back-icon pointer" onClick={() => history.goBack()}>
            <ArrowBackIosIcon />
          </div>

          <h1>Messages</h1>
        </div>
      </div>
    </>
  );
};

export default Messages;
