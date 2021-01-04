import React, { useState } from 'react';
import * as COLORS from '../../../colors';
import { IconButton, Drawer, Avatar } from '@material-ui/core';
import { Sms } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import CommentDrawer from './Comment';
import UserDrawer from './UserDrawer';

export default function Drawers({ project, comments, developer }) {
  const useStyles = makeStyles((theme) => ({}));
  const [cmt, setCmt] = useState({ right: false });
  const [showUser, setShowUser] = useState({ right: false });
  const classes = useStyles();
  const toggleCommentDrawer = (bool) => (event) => {
    setCmt({ right: bool });
  };
  const toggleUserDrawer = (bool) => (event) => {
    setShowUser({ right: bool });
  };

  return (
    <React.Fragment key={'right'}>
      <div
        style={{
          position: 'fixed',
          right: 40,
          top: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 19,
        }}
      >
        <div
          style={{ backgroundColor: COLORS.DEVBLUE, height: 20, width: 1 }}
        ></div>
        <Avatar
          onClick={toggleUserDrawer(true)}
          style={{
            height: 50,
            width: 50,
            border: `1px solid ${COLORS.DEVBLUE}`,
            cursor: 'pointer',
          }}
          src={
            developer?.imageUrl ||
            'https://res.cloudinary.com/willwang/image/upload/v1608279563/23_npj6fd.webp'
          }
        />
        <div
          style={{ backgroundColor: COLORS.DEVBLUE, height: 20, width: 1 }}
        ></div>
        <IconButton
          onClick={toggleCommentDrawer(true)}
          style={{
            height: 50,
            width: 50,
            border: `1px solid ${COLORS.DEVBLUE}`,
            borderRadius: 999,
            backgroundColor: 'white',
            color: COLORS.DEVBLUE,
          }}
        >
          <Sms />
        </IconButton>
        <div
          style={{ backgroundColor: COLORS.DEVBLUE, height: 100, width: 1 }}
        ></div>
      </div>
      <Drawer
        className={classes.drawer}
        anchor={'right'}
        open={cmt.right}
        onClose={toggleCommentDrawer(false)}
      >
        <CommentDrawer
          project={project}
          toggleCommentDrawer={toggleCommentDrawer}
        />
      </Drawer>
      <Drawer
        className={classes.drawer}
        anchor={'right'}
        open={showUser.right}
        onClose={toggleUserDrawer(false)}
      >
        <UserDrawer toggleDrawer={toggleUserDrawer} />
      </Drawer>
    </React.Fragment>
  );
}
