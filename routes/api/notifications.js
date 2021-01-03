const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/User');
const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user._id)
      // .populate('conversations')
      .then((user) => {
        Conversation.find({ unreadBy: user._id }).then((convos) => {
          const numUnread = convos.length;
          user.notifications.messages = numUnread;
          user.save();
          return res.json(user);
        });
      })
      .catch((errors) => res.status(400).json(errors));
  }
);

router.delete(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user._id).then((user) => {
      user.notifications.other = [];
      user.save();
      return res.json(user);
    });
  }
);

router.delete(
  '/other/:notificationId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const notificationId = req.params.notificationId;
    User.findById(req.user._id).then((user) => {
      const newNotifications = user.notifications.other.filter(
        (notification) => notification._id.toString() !== notificationId
      );
      user.notifications.other = newNotifications;
      user.save();
      return res.json(user);
    });
  }
);

module.exports = router;
