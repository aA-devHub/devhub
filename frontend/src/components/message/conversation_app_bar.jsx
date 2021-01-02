import React from 'react';

import { makeStyles, AppBar, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { drawerWidth, navOffset } from './messages';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: navOffset,
    paddingLeft: 40,
    margin: 20,
    width: `calc(100% - ${drawerWidth}px)`,
  },
}));

const ConversationAppBar = ({ name }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ConversationAppBar;
