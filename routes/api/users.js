const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');
const Comment = require('../../models/Comment');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { imageUrl, id } = req.user;
    let notifications = req.user.notifications || 0;
    res.json({ id, imageUrl, notifications });
  }
);

router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((_err) => res.status(404).json({ users: 'No users found' }));
});

router.patch('/:userId', (req, res) => {
  // const user = req.user;
  // console.log('User:', user);
  // if (!user) {
  //   return res.status(404).json({ email: 'This user does not exist' });
  // }
  User.findByIdAndUpdate(req.params.userId, req.body, (err, docs) => {
    if (err) {
      console.log(err);

      // TODO: add better validation?
      // const { errors, isValid } = validateRegisterInput(req.body);

      // if (!isValid) {
      //   return res.status(400).json(errors);
      // }
      return res.status(400).json({ _id: 'invalid update' });
    }
    User.findById(req.params.userId).then((user) => res.json(user));
  }).catch((err) => res.status(404).json(err));

  return null;
});

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      // Throw a 400 error if the email address already exists
      return res.status(400).json({
        email: 'A user has already registered with this address',
      });
    } else {
      // Otherwise create a new user
      const newUser = new User({
        // name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        ...req.body,
      });

      bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            // .then(user => res.json(user))
            .then((user) => {
              const payload = { id: user.id, name: user.name };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (_err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: 'This user does not exist' });
    }

    console.log(user);

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (_err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Incorrect password' });
      }
    });
  });
});

router.get('/:userId/comments', (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate('comments')
    .then((user) => res.json(user.comments))
    .catch((errors) => res.status(400).json(errors));
});

module.exports = router;
