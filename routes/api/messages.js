const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessage = require('../../validation/messages');

// Index returns all messages for currently logged in user (sent and received)
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user;
    const { userId, name } = req.query;

    // create filter for a conversation with user
    let filter = {};
    if (userId) {
      filter = { $or: [{ to: userId }, { from: userId }] };
    }
    console.log('Filtering messages by: ', filter);

    Message.find({
      $or: [{ to: user._id }, { from: user._id }],
      ...filter,
    })
      .populate('from', 'name')
      .populate('to', 'name')
      .sort({ createdAt: -1 })
      .then((messages) => res.json(messages))
      .catch((error) => res.status(404).json(error));
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessage(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    return new Message({ ...req.body, from: req.user._id })
      .save()
      .then((message) => res.json(message))
      .catch((errors) => res.status(404).json(errors));
  }
);

router.get('/:messageId', (req, res) => {
  Message.findById(req.params.messageId)
    .populate('to', 'name')
    .populate('from', 'name')
    .then((message) => res.json(message))
    .catch((_err) => res.status(404).json({ message: 'Message not found' }));
});

router.patch(
  '/:messageId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { messageId } = req.params;

    const { errors, isValid } = validateMessage(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (req.body.toggleRead) {
      req.body.read = !req.body.read;
    }

    return Message.findByIdAndUpdate(messageId, req.body, { new: true })
      .then((message) => res.send(message))
      .catch((err) => res.status(404).json(err));
  }
);

router.delete(
  '/:messageId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { messageId } = req.params;
    Message.findByIdAndRemove(messageId)
      .then((message) => {
        if (!message) res.status(404).json({ message: 'Message bad' });
        else res.json(message);
      })
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = router;
