const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/User');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // debugger;
    User.findById(req.user._id)
      .then((user) => {
        return res.json(user);
      })
      .catch((errors) => res.status(400).json(errors));
  }
);

module.exports = router;
