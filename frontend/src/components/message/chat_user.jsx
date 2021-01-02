import React from 'react';
import { connect } from 'react-redux';

import { fetchMessages } from '../../actions/message_actions';

const mapDispatchToProps = (dispatch, { user }) => ({
  fetchMessages: () =>
    dispatch(
      fetchMessages({
        // TODO:
      })
    ),
});

const ChatUser = ({ user }) => {
  return <div className="chat-user">{user.name}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatUser);
