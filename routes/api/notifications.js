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
      .then((user) => {
        Message.countDocuments({ to: user._id, read: false }).then(
          (numUnread) => {
            user.notifications.messages = numUnread;
            return res.json(user);
          }
        );
      })
      .catch((errors) => res.status(400).json(errors));
  }
);

module.exports = router;
