const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Project = require('../../models/Project');
const User = require('../../models/User');

const validateProject = require('../../validation/projects');
const validateProjectUpdate = require('../../validation/projects');

// Get featured projects
// TODO: implement after implementing numFavorites
// router.get('/featured', (req, res) => {
//   Project.find(
//     {},
//     { title: 1, images: 1, user: 1, technologies: 1 }
//   )
//     .then((projects) => {

//     })
// });

// Get all projects
// Will prob need some limit / filtering logic
router.get('/', (req, res) => {
  Project.find(
    {},
    { title: 1, images: 1, user: 1, comments: 1, technologies: 1 }
  )
    .populate('user')
    .populate('comments')
    .then((projects) => {
      let users = [];
      let comments = [];
      projects.forEach((proj) => {
        if (!users.includes(proj.user)) {
          users.push(proj.user);
        }
        comments = comments.concat(proj.comments);
        proj.user = proj.user._id;
        delete proj.comments;
      });
      return res.json({ projects, users, comments });
    })
    .catch((err) =>
      res.status(404).json({ noProjectsfound: 'No projects found' })
    );
});

// Get all projects of a user
router.get('/user/:userId', (req, res) => {
  Project.find(
    { user: req.params.userId },
    { title: 1, images: 1, user: 1, comments: 1, technologies: 1 }
  )
    .populate('user')
    .populate('comments')
    .then((projects) => {
      const user = projects[0].user;
      let comments = [];
      projects.forEach((proj) => {
        proj.user = proj.user._id;
        comments = comments.concat(proj.comments);
        delete proj.comments;
      });
      return res.json({ projects, users: [user], comments });
    })
    .catch((err) =>
      res
        .status(404)
        .json({ noProjectsfound: 'No projects found for that user' })
    );
});

// Get a specific project by id
router.get('/:projectId', (req, res) => {
  Project.findById(req.params.projectId)
    .populate('user')
    .populate('comments')
    .then((project) => {
      const user = project.user;
      const comments = project.comments;
      project.user = project.user._id;
      project.comments = project.comments.map((comment) => comment._id);
      return res.json({ project, user, comments });
    })
    .catch((err) =>
      res.status(404).json({ noProjectfound: 'No project found with that ID' })
    );
});

// Creates a new project
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
      githubLink: req.body.githubLink,
      liveLink: req.body.liveLink,
      description: req.body.description,
      images: req.body.images,
      ui: req.body.ui,
      features: req.body.features,
      mobile: req.body.mobile,
      browsers: req.body.browsers,
      futureFeatures: req.body.futureFeatures,
      user: req.body.user,
      languages: req.body.languages,
    });

    newProject.save().then((project) => {
      User.findById(project.user).then((user) =>
        res.json({ project, user, comments: [] })
      );
    });
  }
);

router.patch(
  '/test/:projectId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {}
);

// Updates an existing project
// TODO: May need updating
router.patch('/:projectId', (req, res) => {
  // Add validation to see if req has proper parameters (_id, user, etc)
  // const { errors, isValid } = validateProjectUpdate(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const projectId = req.params.projectId;

  Project.findOne({ _id: projectId }).then((project) => {
    if (!project) {
      return res.status(404).send();
    }

    project.title = req.body.title;
    project.githubLink = req.body.githubLink;
    project.liveLink = req.body.liveLink;
    project.description = req.body.description;
    project.images = req.body.images;
    project.ui = req.body.ui;
    project.features = req.body.features;
    project.mobile = req.body.mobile;
    project.browsers = req.body.browsers;
    project.futureFeatures = req.body.futureFeatures;
    project.user = req.body.user;
    project.languages = req.body.languages;

    project.save().then(() => {
      Project.findById(projectId)
        .populate('comments')
        .then((updatedProject) => {
          const comments = updatedProject.comments;
          updatedProject.comments = updatedProject.comments.map(
            (comment) => comment._id
          );
          User.findById(updatedProject.user).then((user) =>
            res.json({ project: updatedProject, user, comments })
          );
        });
    });
  });
});

// Favorite a project
router.post(
  '/:projectId/favorite',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user._id).then((user) => {
      user.favorites.push(req.params.projectId);
      user.save();

      Project.findById(req.params.projectId).then((project) => {
        project.numFavorites += 1;
        project.save();
        res.json({ project, user: 'ignore', comments: 'ignore' });
      });
    });
  }
);

// Unfavorite a project
router.delete(
  '/:projectId/favorite',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user._id).then((user) => {
      const idx = user.favorites.indexOf(req.params.projectId);
      if (idx > -1) {
        user.favorites.splice(idx, 1);
        user.save();
      }

      Project.findById(req.params.projectId).then((project) => {
        project.numFavorites -= 1;
        project.save();
        res.json({ project, user: 'ignore', comments: 'ignore' });
      });
    });
  }
);

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
      res.send(project);
    })
    .catch((e) => {
      res.status(400).send();
    });
});

router.get('/:projectId/comments', (req, res) => {
  const { projectId } = req.params;
  Project.findById(projectId)
    .populate('comments')
    .then((project) => {
      return res.json(project.comments);
    })
    .catch((errors) => res.status(400).json(errors));
});

module.exports = router;
