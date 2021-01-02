import * as COLORS from '../../../colors';
import React, { useState, useEffect } from 'react';
import {
  fade,
  withStyles,
  InputBase,
  makeStyles,
  Avatar,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    padding: 20,
  },
}));
function UserInfo({ developer }) {
  const dev = {
    imageUrl:
      'https://res.cloudinary.com/willwang/image/upload/v1609184704/logoround_tgdkrs.png',
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" style={{ marginBottom: 20 }}>
        Developer Information
      </Typography>
    </div>
  );
}

export default connect(
  (state, ownProps) => ({
    userId: state.session.user.id,
    toggleDrawer: ownProps.toggleDrawer,
    comments: ownProps.comments,
  }),
  (dispatch) => ({})
)(UserInfo);
