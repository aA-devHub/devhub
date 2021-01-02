const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessage = require('../../validation/messages');

// filter to return all user's sent/received messages
const userMessages = (userId) => ({
  $or: [{ to: userId }, { from: userId }],
});

// Index returns all messages for currently logged in user (sent and received)
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user;
    const { userId, name } = req.query;

    // create filter for a conversation with user
    let filter = userId ? userMessages(userId) : {};
    // console.log('Filtering messages by: ', filter);

    Message.find({
      ...userMessages(user._id),
      ...filter,
    })
      .populate('from', 'name')
      .populate('to', 'name')
      .sort({ createdAt: -1 })
      .then((messages) => res.json(messages))
      .catch((error) => res.status(404).json(error));
  }
);

// Get list of users that current user has conversations threads with
// router.get(
//   '/threads',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//     const user = req.user;
//     const filter = {
//       ...userMessages(user._id)
//     };

//     const messages = await Message.find(filter).populate();
//   }
// );

// Toggle entire thread with other user containing `messageId` as un/read
// if `read` is not passed in request body, then by default thread is marked as read
router.post(
  '/thread/:messageId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { messageId } = req.params;
    const user = req.user;
    const markRead = 'read' in req.body ? req.body.read : true;

    Message.findById(messageId, function (err, msg) {
      if (err) return res.status(404).json(err);

      const otherUser = msg.to === req.user._id ? msg.from : msg.to;
      const filter = {
        ...userMessages(user._id),
        ...userMessages(otherUser._id),
      };

      return Message.updateMany(filter, { read: markRead }, { new: true })
        .then((_) =>
          Message.find(filter).then((messages) => res.json(messages))
        )
        .catch((errors) => res.status(404).json(errors));
    });
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

    Message.findById(messageId, function (err, message) {
      if (err) return res.status(404).json(err);

      // no need to verify if just toggling read status
      // console.log('Message: ', message);
      if (req.body.toggleRead) {
        message.read = !message.read;
      } else {
        const { errors, isValid } = validateMessage(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        message.body = req.body;
      }
      return message
        .save()
        .then((msg) => res.json(msg))
        .catch((err) => res.status(404).json(err));
    });
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

module.exports = {
  router,
  userMessages,
};
