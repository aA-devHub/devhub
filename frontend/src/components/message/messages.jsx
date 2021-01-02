import React from 'react';
import { connect } from 'react-redux';
import { ProtectedRoute } from '../../util/route_util';
import { Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ConversationDrawer from './conversation_drawer';
import ConversationAppBar from './conversation_app_bar';
import ShowConversation from './show_conversation';

export const drawerWidth = 240;
export const navOffset = 64;

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

// name of other person(s) in conversation
export const otherParticipant = (user, participants) => {
  console.log('participants: ', participants);
  return participants && participants.filter((x) => x.name !== user.name)[0];
};

const Messages = ({ history }) => {
  const classes = useStyles();
  // const [conversation, setConversation] = React.useState(null);

  return (
    <div>
      <div className={classes.root}>
        <ConversationDrawer /* setConversation={setConversation} */ />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {/* <Typography paragraph>Chattings</Typography> */}

          <Switch>
            <ProtectedRoute
              exact
              path="/messages/:conversationId"
              component={ShowConversation}
            />
            <Route path="/messages" component={ConversationAppBar} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Messages;
