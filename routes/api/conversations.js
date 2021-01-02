const express = require('express');
const router = express.Router();
const passport = require('passport');

const Conversation = require('../../models/Conversation');
// const validateConversation = require('../../validation/conversations');

// TODO: add filtered search
// https://stackoverflow.com/questions/11303294/querying-after-populate-in-mongoose
// needs to filter by participant name after populate, see $lookup
const buildSearchFilter = ({ search }) => {
  return search
    ? {
        participants: {
          name: new RegExp(search, 'i'),
        },
      }
    : null;
};

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = req.user;

    const filter = buildSearchFilter(req.query);

    let conversations = await Conversation.find({ participants: user._id })
      .populate('participants', 'name')
      .populate('unreadBy', 'name')
      .sort({ updatedAt: -1 })
      .then((conversations) => res.json(conversations))
      .catch((errors) => res.status(404).json(errors));

    return conversations;
  }
);

// Return the messages associated with conversation
// Marks the conversation as read by the current user
router.get(
  '/:conversationId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userId = req.user._id;
    const { conversationId } = req.params;

    Conversation.findById(conversationId)
      .populate({
        path: 'messages',
        populate: {
          path: 'from',
          select: 'name',
        },
      })
      .populate('participants', 'name')
      .populate('unreadBy', 'name')
      .then((conversation) => {
        const messages = conversation.messages.slice();
        conversation.messages = messages.map((e) => e._id);

        // Mark conversation as read by current user if not already
        conversation.unreadBy = conversation.unreadBy.filter(
          (x) => !x._id.equals(userId)
        );
        conversation.save();

        res.json({ conversation, messages });
        // XXX: remove this after notifications are updated
        //   Message.updateMany({
        //     _id: conversation.messages,
        //     to: userId
        //   }, { read: true }, { new: true })
        //     .then(_ => Message.find({ _id: conversation.messages }))
        //     .catch(errors => res.status(404).json(errors));
        // })
        // .catch(errors => res.status(404).json(errors));
      })
      .catch((errors) => res.status(404).json(errors));
  }
);

module.exports = router;
