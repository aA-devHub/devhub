const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Project = require('../../models/Project');
const validateProject = require('../../validation/projects');

// Get all projects
// Will need some pagination / limit logic
router.get('/', (req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) =>
      res.status(404).json({ noProjectsfound: 'No projects found' })
    );
});

// Get all projects of a user
router.get('/user/:userId', (req, res) => {
  Project.find({ user: req.params.userId })
    .then((projects) => res.json(projects))
    .catch((err) =>
      res
        .status(404)
        .json({ noProjectsfound: 'No projects found for that user' })
    );
});

// Get a specific project by id
router.get('/:projectId', (req, res) => {
  Project.findById(req.params.projectId)
    .then((project) => res.json(project))
    .catch((err) =>
      res.status(404).json({ noProjectfound: 'No project found with that ID' })
    );
});

// Creates a new project
// TODO: This route needs editing
// The project creation is dependent on the structure of the req.body
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProject(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

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

// Updates an existing project
// TODO: This route needs editing
// The project updating is dependent on the structure of the req.body
router.patch('/:projectId', (req, res) => {
  const id = req.params.projectId;

  Project.findOne({ _id: id }).then((project) => {
    if (!project) {
      return res.status(404).send();
    }
    project.title = req.body.title;
    project.description = req.body.description;
    project.github_link = req.body.github_link;
    project.live_link = req.body.live_link;
    project.mobile = req.body.mobile;
    project.user = req.body.user;

    project.save().then(
      (updatedProject) => {
        res.send(updatedProject);
      },
      (e) => {
        res.status(400).send(e);
      }
    );
  });
});

// Remove an existing project by id
router.delete('/:projectId', (req, res) => {
  const id = req.params.projectId;
  Project.findOneAndRemove({
    _id: id,
  })
    .then((project) => {
      if (!project) {
        return res.status(404).send();
      }
      res.send({
        project,
      });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

module.exports = router;
