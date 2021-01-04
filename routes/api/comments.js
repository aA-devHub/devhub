const express = require('express');
const router = express.Router();
const passport = require('passport');
var mongoose = require('mongoose');

const Comment = require('../../models/Comment');
const User = require('../../models/User');
const Project = require('../../models/Project');
const validateComment = require('../../validation/comments');

// Note: GET routes populate user field with user's namte
router.get('/', (req, res) => {
  Comment.find()
    .populate('user', 'name')
    .then((comments) => res.json(comments))
    .catch((error) => res.status(404).json(error));
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateComment(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    req.body.userName = req.user.name;
    req.body.user = req.user._id;

    const projectId = req.body.project;
    User.findById(req.user._id).then((commenter) => {
      Project.findById(projectId).then((project) => {
        User.findById(project.user).then((recipient) => {
          let newNotification = {
            source: 'comment',
            userName: commenter.name,
            projectId: project._id,
            projectName: project.title,
            _id: mongoose.Types.ObjectId(),
          };
          recipient.notifications.other.push(newNotification);
          recipient.save();
        });
      });
    });

    return new Comment(req.body)
      .save()
      .then((comment) => {
        Project.findById(comment.project).then((project) => {
          project.comments.push(comment._id);
          project.save();
        });
        res.json(comment);
      })
      .catch((errors) => res.status(404).json(errors));
  }
);

router.get('/:commentId', (req, res) => {
  Comment.findById(req.params.commentId)
    .populate('user', 'name')
    .then((comment) => res.json(comment))
    .catch((_err) => res.status(404).json({ comment: 'Comment not found' }));
});

router.patch(
  '/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { commentId } = req.params;

    const { errors, isValid } = validateComment(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Comment.findByIdAndUpdate(commentId, req.body, (err, docs) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ commentId: 'invalid update' });
      }

      Comment.findById(commentId)
        .then((comment) => res.send(comment))
        .catch((err) => res.status(404).json(err));
    });
  }
);

router.delete(
  '/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { commentId } = req.params;
    Comment.findByIdAndRemove(commentId)
      .then((comment) => {
        if (!comment) return res.status(404).send();
        res.send(comment);
      })
      .catch((err) => res.status(400).send());
  }
);

module.exports = router;
