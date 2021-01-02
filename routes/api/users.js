const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');
// const Comment = require('../../models/Comment');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const Project = require('../../models/Project');
const userMessages = require('./messages').userMessages;

// Extract fields to store under state.session.user
const sessionUserPayload = (user) => ({
  id: user.id,
  name: user.name,
  imageUrl: user.imageUrl,
  // FIXME: how to handle notifications
  // notifications are counts of unread messages + comments
  notifications: user.notifications || 0,
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const payload = sessionUserPayload(req.user);
    res.json(payload);
  }
);

// XXX: not really used?
router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((_err) => res.status(404).json({ users: 'No users found' }));
});

// Return user details and populate projects slice with user's projects
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .populate('projects')
    .then((user) => {
      const projects = user.projects.slice();
      user.projects = projects.map((e) => e._id);
      res.json({ user, projects });
    })
    .catch((err) => res.json(err));
});

router.patch(
  '/:userId',
  // FIXME: this should really only allow the current user to patch their
  // own self
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const user = req.user;
    // console.log('User:', user);
    // if (!user) {
    //   return res.status(404).json({ email: 'This user does not exist' });
    // }
    // let favorites = req.body.favorites;
    let projectId = req.body.newFavorite || req.body.oldFavorite;
    let incr = req.body.newFavorite ? 1 : -1;
    if (projectId) {
      Project.findById(projectId).then((project) => {
        project.numFavorites += incr;
        project.save();
      });
    }

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
      User.findById(req.params.userId)
        .populate('projects')
        .then((user) => {
          const projects = user.projects.slice();
          user.projects = projects.map((e) => e._id);
          res.json({ user, projects });
        });
      return null;
    });
  }
);

// => '/signup'
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
            .then((user) => {
              const payload = sessionUserPayload(user);

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

    console.log('Logged in: ', user);

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = sessionUserPayload(user);

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

// // FIX: not being hit, actually hitting /api/users/:userId
// router.get(
//   '/notifications',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     User.findById(req.body.user._id)
//       .then((user) => {
//         return res.json(user);
//       })
//       .catch((errors) => res.status(400).json(errors));
//   }
// );

module.exports = router;
