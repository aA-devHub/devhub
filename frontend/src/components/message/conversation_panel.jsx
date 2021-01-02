import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ConversationItem from './conversation_item';
import ConversationSearch from './conversation_search';
import { fetchConversations } from '../../actions/conversation_actions';

const mapStateToProps = (state, _ownProps) => ({
  conversations: state.entities.conversations,
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversations: () => dispatch(fetchConversations()),
});

const ConversationPanel = ({ conversations, fetchConversations }) => {
  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="conversation-panel">
      <h3>Chats</h3>

      <ConversationSearch />

      <ul className="conversation-panel">
        {Object.values(conversations).map((conversation, idx) => (
          <ConversationItem conversation={conversation} key={idx} />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPanel);
