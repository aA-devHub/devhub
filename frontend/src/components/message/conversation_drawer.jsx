import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListSubheader, Divider } from '@material-ui/core';

import ConversationItem from './conversation_item';
import ConversationSearch from './conversation_search';
import { drawerWidth } from './messages';
import { fetchConversations } from '../../actions/conversation_actions';

const mapStateToProps = (state, _ownProps) => ({
  conversations: state.entities.conversations,
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversations: () => dispatch(fetchConversations()),
});

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    minHeight: '500px',
    height: 'fit-content',
    top: '64px',
    margin: '20px',
  },
  // necessary for content to be below app bar
  toolbar: {
    // ...theme.mixins.toolbar,
    minHeight: '10px',
  },
}));

const ConversationDrawer = ({ conversations, fetchConversations }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchConversations();
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
        <ListSubheader>Conversations</ListSubheader>

        <ConversationSearch />

        <div className={classes.toolbar} />
        <Divider />

        {Object.values(conversations).map((conversation, idx) => (
          <ConversationItem conversation={conversation} key={idx} />
        ))}
      </List>
    </Drawer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationDrawer);
