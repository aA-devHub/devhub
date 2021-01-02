const express = require('express');
const router = express.Router();
const passport = require('passport');

const Conversation = require('../../models/Conversation');
const validateConversation = require('../../validation/conversations');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = req.user;

    Conversation.find({
      participants: user._id,
    })
      .populate('participants', 'name')
      .populate('unreadBy', 'name')
      .sort({ updatedAt: -1 })
      .then((conversations) => res.json(conversations))
      .catch((errors) => res.status(404).json(errors));
  }
);

router.get(
  '/:conversationId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = req.user;
    const { conversationId } = req.params;

    Conversation.findById(conversationId)
      .populate('participants', 'name')
      .populate('messages');
  }
);
