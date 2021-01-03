import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, Typography } from '@material-ui/core';

// import ConversationAppBar from './conversation_app_bar';
import { otherParticipant, drawerWidth, navOffset } from './messages';

const useStyles = makeStyles((theme) => ({
  conversation: {
    position: 'relative',
    height: '100%',
  },
  messageList: {
    height: 'calc(100% - 3rem)',
    overflowY: 'scroll',
  },
}));

const mapStateToProps = (state, ownProps) => {
  const { conversationId } = ownProps.match.params;
  const conversation = state.entities.conversations[conversationId];
  const user = state.session.user;
  return {
    user,
    conversation,
    messages: state.entities.messages,
    otherUser:
      conversation && otherParticipant(user, conversation.participants),
  };
};

const mapDispatchToProps = (dispatch) => ({});

const ShowConversation = ({ user, otherUser, conversation, messages }) => {
  const classes = useStyles();
  if (!conversation) return null;

  return (
    <>
      {/* <ConversationAppBar name={otherUser.name} /> */}
      <div className="conversation">
        {Object.values(messages).map((msg, idx) => (
          <Typography paragraph key={idx}>
            {msg.body}
          </Typography>
        ))}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowConversation);
