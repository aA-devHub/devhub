import React from 'react';
import * as COLORS from '../../colors';
import { connect } from 'react-redux';

import { makeStyles, fade, Typography, Avatar } from '@material-ui/core';

// import ConversationAppBar from './conversation_app_bar';
import MessageInput from './message_input';
import { otherParticipant, drawerWidth, navOffset } from './messages';
import { getMessages } from '../../selectors/messages';
import './messages.css';

const useStyles = makeStyles((theme) => ({
  conversation: {
    position: 'relative',
    height: 'calc(100% - 44px)',
    overflowY: 'scroll',
    padding: '20px 24px 40px 24px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  messageList: {
    height: 'calc(100% - 3rem)',
    overflowY: 'scroll',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  sentByUser: {
    backgroundColor: fade(theme.palette.info.main, 0.85),
    margin: '0 20px 0 80px',
    color: theme.palette.common.white,
  },
  sentToUser: {
    backgroundColor: fade(theme.palette.primary.light, 0.2),
    margin: '0 80px 0 20px',
  },
  messageBubbleContainer: {
    display: 'flex',
    alignItems: 'center',

    margin: '8px 0 8px 0',
  },
  avatars: {
    border: `1px solid ${COLORS.DEVBLUE}`,
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    paddingBottom: 2,
  },
  dateText: {
    color: 'grey',
  },
}));

const mapStateToProps = (state, ownProps) => {
  const { conversationId } = ownProps.match.params;
  const conversation = state.entities.conversations[conversationId];
  const user = state.session.user;
  return {
    user,
    conversation,
    messages: getMessages(state.entities.messages),
    otherUser:
      conversation && otherParticipant(user, conversation.participants),
  };
};

const mapDispatchToProps = (dispatch) => ({});

const MessageBubble = ({ user, otherUser, showDate, message, classes }) => {
  const from = user.id === message.from._id;

  return (
    <div>
      {showDate && (
        <div className={classes.dateContainer}>
          <Typography className={classes.dateText}>
            {message.createdAt}
          </Typography>
        </div>
      )}
      <div
        className={`${classes.messageBubbleContainer} ${
          from && classes.reverse
        }`}
      >
        <Avatar
          className={classes.avatars}
          src={from ? user.imageUrl : otherUser.imageUrl}
        />
        <Typography
          className={`message-bubble \
			${from ? classes.sentByUser : classes.sentToUser}`}
        >
          {message.body}
        </Typography>
      </div>
    </div>
  );
};

const ShowConversation = ({ user, otherUser, conversation, messages }) => {
  const classes = useStyles();
  if (!conversation) return null;

  return (
    <>
      {/* <ConversationAppBar name={otherUser.name} /> */}
      <div className={classes.conversation}>
        {messages.map((msg, idx) => {
          // only show date if previous message from different user
          const showDate =
            idx === 0 ||
            messages[idx].from.name !== messages[idx - 1].from.name;

          return (
            <MessageBubble
              key={idx}
              user={user}
              showDate={showDate}
              otherUser={otherUser}
              message={msg}
              classes={classes}
            />
          );
        })}
      </div>
      <MessageInput receiver={otherUser} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowConversation);
