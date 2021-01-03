const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/User');
const Message = require('../../models/Message');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user._id)
      .populate('conversations')
      .then((user) => {
        const numUnread = user.conversations.reduce(
          (count, convo) => (convo.unreadBy.length > 0 ? count + 1 : count),
          0
        );

        user.notifications.messages = numUnread;
        user.save();
        return res.json(user);
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
