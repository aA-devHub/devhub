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

import * as COLORS from '../../colors';
import { startConversation } from '../../actions/conversation_actions';

const mapStateToProps = (state, _ownProps) => ({
  // user: state.session.user,
});

const mapDispatchToProps = (dispatch, { user }) => ({
  startConversation: () => dispatch(startConversation(user._id)),
});

// const any = (arr, fn = Boolean) => arr.some(fn);

const useStyles = makeStyles((theme) => ({
  avatars: {
    marginTop: '1rem',
    border: `1px solid ${COLORS.DEVBLUE}`,
  },
}));

const UserItem = ({
  history,
  user,
  startConversation,
  // fetchConversation,
}) => {
  const classes = useStyles();
  const { name, imageUrl } = user;
  return (
    <ListItem
      button
      key={user.name}
      onClick={() => {
        history.push(`/users/${user._id}`);
        /* startConversation(); */
      }}
    >
      <ListItemIcon>
        <Avatar src={imageUrl} className={classes.avatars} />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserItem)
);
