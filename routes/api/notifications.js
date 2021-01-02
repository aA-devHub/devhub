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
            user.save();
            return res.json(user);
          }
        );
      })
      .catch((errors) => res.status(400).json(errors));
  }
);

router.delete(
  '/projects/:projectId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user._id).then((user) => {
      const projectId = req.params.projectId;
      const idx = user.notifications.projects.indexOf(projectId);
      if (idx > -1) {
        user.notifications.projects.splice(idx, 1);
        user.save();
      }
      return res.json(user);
    });
  }
);

module.exports = router;
