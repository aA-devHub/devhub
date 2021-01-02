import React from 'react';
import { connect } from 'react-redux';

import { fetchConversation } from '../../actions/conversation_actions';

const mapStateToProps = (state, _ownProps) => ({
  user: state.session.user,
});

const mapDispatchToProps = (dispatch, { conversation }) => ({
  fetchConversation: () => dispatch(fetchConversation(conversation._id)),
});

const any = (arr, fn = Boolean) => arr.some(fn);

const ConversationItem = ({ user, conversation, fetchConversation }) => {
  const { participants, unreadBy } = conversation;
  const name = participants.filter((x) => x.name !== user.name)[0].name;
  const unread = any(unreadBy, (x) => x.name === user.name);

  return (
    <li className="conversation-item" onClick={() => fetchConversation()}>
      {/* TODO: */}
      {name} {unread && '[unread]'}
    </li>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationItem);
