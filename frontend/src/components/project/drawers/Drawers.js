import React, { useState, useEffect } from 'react';
import * as COLORS from '../../../colors';
import { IconButton, Drawer, Avatar } from '@material-ui/core';
import { Sms, GitHub, Star, Slideshow } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import CommentDrawer from './Comment';
import UserDrawer from './UserDrawer';
import FavoriteButton from '../FavoriteButton';

export default function Drawers({ project, comments, developer }) {
  const [dev, setDev] = useState({});
  const useStyles = makeStyles((theme) => ({
    root: {},
    iconButtons: {
      height: 50,
      width: 50,
      border: `1px solid ${COLORS.DEVBLUE}`,
      borderRadius: 999,
      backgroundColor: 'white',
      color: COLORS.DEVBLUE,
    },
  }));
  useEffect(() => {
    if (developer?.imageUrl) {
      setImage(developer.imageUrl);
      setDev(developer);
    }
  }, [developer]);
  const [cmt, setCmt] = useState({ right: false });
  const [image, setImage] = useState('');
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
        <IconButton
          onClick={toggleUserDrawer(true)}
          className={classes.iconButtons}
        >
          <Avatar src={image} />
        </IconButton>
        <div
          style={{ backgroundColor: COLORS.DEVBLUE, height: 20, width: 1 }}
        ></div>
        <IconButton
          onClick={toggleCommentDrawer(true)}
          className={classes.iconButtons}
        >
          <Sms />
        </IconButton>
        <div
          style={{ backgroundColor: COLORS.DEVBLUE, height: 20, width: 1 }}
        ></div>
        <IconButton
          className={classes.iconButtons}
          href={project.liveLink}
          target="_blank"
        >
          <Slideshow />
        </IconButton>
        <div
          style={{ backgroundColor: COLORS.DEVBLUE, height: 20, width: 1 }}
        ></div>
        <IconButton
          className={classes.iconButtons}
          target="_blank"
          href={project.githubLink}
        >
          <GitHub />
        </IconButton>
        <div
          style={{ backgroundColor: COLORS.DEVBLUE, height: 20, width: 1 }}
        ></div>
        <IconButton className={classes.iconButtons}>
          <FavoriteButton project={project} />
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
          comments={comments}
          toggleCommentDrawer={toggleCommentDrawer}
        />
      </Drawer>
      <Drawer
        className={classes.drawer}
        anchor={'right'}
        open={showUser.right}
        onClose={toggleUserDrawer(false)}
      >
        <UserDrawer developer={dev} toggleDrawer={toggleUserDrawer} />
      </Drawer>
    </React.Fragment>
  );
}
