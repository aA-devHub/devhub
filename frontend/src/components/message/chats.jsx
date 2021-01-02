import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ChatUser from './chat_user';
import { fetchConversations } from '../../actions/message_actions';

const mapStateToProps = (state, _ownProps) => ({
  users: state.entities.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversations: () => dispatch(fetchConversations()),
});

const Chats = ({ users, fetchMessages }) => {
  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="chat-sidebar">
      {users.map((user, idx) => (
        <ChatUser user={user} key={idx} />
      ))}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
