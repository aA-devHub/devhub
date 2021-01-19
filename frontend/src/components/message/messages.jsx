import React, { useState } from 'react';
import { ProtectedRoute } from '../../util/route_util';
import { Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';

import ConversationDrawer from './conversation_drawer';
import ShowConversation from './show_conversation';

export const drawerWidth = 240;
export const navOffset = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '6.5vh',
    display: 'flex',
    height: '75vh',
    boxShadow: '0px 20px 35px 0px rgba(0, 0, 0, 0.1)',
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRight: '1px solid rgba(0,0,0, 0.12)',
    // padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

// name of other person(s) in conversation
export const otherParticipant = (user, participants) => {
  // console.log('participants: ', participants);
  return participants && participants.filter((x) => x.name !== user.name)[0];
};

const Messages = ({ history }) => {
  const classes = useStyles();
  // const [conversation, setConversation] = React.useState(null);
  const [imgshow, setImgshow] = useState('');

  return (
    <div>
      <div className={classes.root}>
        <ConversationDrawer
          onMouseIn={() => setImgshow('none')}
          /* setConversation={setConversation} */
        />

        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}

          {/* <Typography paragraph>Chattings</Typography> */}
          <div style={{ margin: '0 auto', display: imgshow }}>
            <img
              src="https://res.cloudinary.com/willwang/image/upload/v1609657172/MessagePage_wajrjn.png"
              style={{
                zIndex: -1,
                width: 300,
                marginLeft: 20,
                marginRight: 10,
              }}
              alt="Messages"
            />
          </div>

          <Switch>
            <ProtectedRoute
              style={{ zIndex: 888 }}
              exact
              path="/messages/:conversationId"
              component={ShowConversation}
            />
            {/* <Route path="/messages" component={ConversationAppBar} /> */}
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Messages;
