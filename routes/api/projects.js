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
        if (proj.user) proj.user = proj.user._id;
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
        if (proj.user) proj.user = proj.user._id;
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
      let user = project.user ? project.user : 'ignore';
      const comments = project.comments;
      if (project.user) project.user = project.user._id;
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
    if (typeof req.body.user === 'object' && req.body.user !== null) {
      req.body.user = Object.values(req.body.user)[0];
    }

    const newProject = new Project(req.body);

    newProject.save().then((project) => {
      User.findById(project.user).then((user) => {
        res.json({ project, user, comments: [] });
      });
    });
  }
);

// Update a project
router.patch(
  '/:projectId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Project.findByIdAndUpdate(req.params.projectId, req.body, (err, docs) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ _id: 'Invalid update' });
      }
      if (typeof req.body.user === 'object' && req.body.user !== null) {
        req.body.user = Object.values(req.body.user)[0];
      }
      Project.findById(req.params.projectId)
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
      return null;
    });
  }
);

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
