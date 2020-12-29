const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Project = require('../../models/Project');
const validateProject = require('../../validation/projects');

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

// This route needs editing
// The project creation is dependent on the structure of the req.body
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProject(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // debugger;
    const newProject = new Project({
      title: req.body.title,
      github_link: req.body.github_link,
      live_link: req.body.live_link,
      description: req.body.description,
      // images: req.body.images,
      // ui: {color: req.body.color},
      // features: req.body.features,
      mobile: req.body.mobile,
      // browsers: req.body.browsers,
      // future_features: req.body.future_features,
      user: req.body.user,
    });

    newProject.save().then((project) => res.json(project));
  }
);

module.exports = router;
