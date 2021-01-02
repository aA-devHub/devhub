import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import * as COLORS from '../../colors';
import { fetchConversation } from '../../actions/conversation_actions';

const mapStateToProps = (state, _ownProps) => ({
  user: state.session.user,
});

const mapDispatchToProps = (dispatch, { conversation }) => ({
  fetchConversation: () => dispatch(fetchConversation(conversation._id)),
});

const any = (arr, fn = Boolean) => arr.some(fn);

const useStyles = makeStyles((theme) => ({
  avatars: {
    margin: '2rem 1rem 0 1rem',
  },
}));

const ConversationItem = ({
  history,
  user,
  conversation,
  fetchConversation,
}) => {
  const classes = useStyles();

  const { participants, unreadBy } = conversation;
  const name = participants.filter((x) => x.name !== user.name)[0].name;
  const unread = any(unreadBy, (x) => x.name === user.name);

  return (
    <ListItem
      button
      key={name}
      onClick={() => {
        history.push(`/messages/${conversation._id}`);
        fetchConversation();
      }}
    >
      <ListItemIcon>
        <Avatar src={user.imageUrl} className={classes.avatar} />
      </ListItemIcon>
      <ListItemText primary={name} />
      {unread && (
        <ListItemIcon>
          <FiberManualRecordIcon style={{ color: COLORS.DEVBLUE }} />
        </ListItemIcon>
      )}
    </ListItem>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConversationItem)
);
