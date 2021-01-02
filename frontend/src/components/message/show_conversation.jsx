import React from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import ConversationAppBar from './conversation_app_bar';
import { otherParticipant, drawerWidth, navOffset } from './messages';

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
  if (!conversation) return null;
  // console.log('Conversation: ', conversation);

  return (
    <>
      <ConversationAppBar name={otherUser.name} />

      {Object.values(messages).map((msg, idx) => (
        <Typography paragraph key={idx}>
          {msg.body}
        </Typography>
      ))}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowConversation);
