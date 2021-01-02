import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ConversationDrawer from './conversation_drawer';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '10px',
    padding: '0 10px 0 10px',
    minHeight: '500px',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const Messages = ({ history }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <ConversationDrawer />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Typography paragraph>Chattings</Typography>
        </main>
      </div>
    </div>
  );
};

export default Messages;
