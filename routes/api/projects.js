const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Project = require('../../models/Project');

router.get('/', (req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) =>
      res.status(404).json({ noProjectsfound: 'No projects found' })
    );
});

router.get('/user/:userId', (req, res) => {
  Project.find({ user: req.params.userId })
    .then((projects) => res.json(projects))
    .catch((err) =>
      res
        .status(404)
        .json({ noProjectsfound: 'No projects found for that user' })
    );
});

router.get('/:id', (req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) =>
      res.status(404).json({ noProjectfound: 'No project found with that ID' })
    );
});

// router.post('/',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//       const { errors, isValid } = validateTweetInput(req.body);

//       if (!isValid) {
//         return res.status(400).json(errors);
//       }

//       const newTweet = new Tweet({
//         text: req.body.text,
//         user: req.user.id
//       });

//       newTweet.save().then(tweet => res.json(tweet));
//     }
//   );

module.exports = router;
