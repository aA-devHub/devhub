import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListSubheader, Divider } from '@material-ui/core';

import ConversationItem from './conversation_item';
import UserItem from './user_item';
import ConversationSearch from './conversation_search';
import { drawerWidth } from './messages';
import { fetchConversations } from '../../actions/conversation_actions';

const mapStateToProps = (state, _ownProps) => ({
  conversations: state.entities.conversations,
  users: state.entities.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversations: () => dispatch(fetchConversations()),
});

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
    margin: '0px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    position: 'absolute',
    zIndex: 1,
    border: '1px solid rgba(0,0,0, 0.12)',
  },
  sticky: {
    backgroundColor: theme.backgroundColor,
  },
  // necessary for content to be below app bar
  toolbar: {
    // ...theme.mixins.toolbar,
    minHeight: '10px',
  },
  subheaderRoot: {
    backgroundColor: 'white',
  },
  subheaderSticky: {
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.05)',
    border: 'solid 1px white',
  },
}));

const ConversationDrawer = ({
  history,
  users,
  conversations,
  fetchConversations,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List>
        <ListSubheader
          classes={{
            root: classes.subheaderRoot,
            sticky: classes.subheaderSticky,
          }}
        >
          Conversations
          <ConversationSearch />
        </ListSubheader>

        {/* <div className={classes.toolbar} /> */}
        <Divider />

        {Object.values(conversations).map((conversation, idx) => (
          <ConversationItem key={idx} conversation={conversation} />
        ))}

        {/* if no conversations match filter, display matching users */}
        {!Object.keys(conversations).length && (
          <>
            <Divider />
            <ListSubheader>Start Conversation</ListSubheader>
            {Object.values(users).map((user, idx) => (
              <UserItem key={idx} user={user} />
            ))}
          </>
        )}
      </List>
    </Drawer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationDrawer);
