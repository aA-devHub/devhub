const express = require('express');
const router = express.Router();
const passport = require('passport');

const Comment = require('../../models/Comment');
const validateComment = require('../../validation/comments');

router.get('/', (req, res) => {
  Comment.find()
    .populate('user', 'name')
    .then((comments) => res.json(comments))
    .catch((error) => res.status(404).json(error));
});

router.get('/:commentId', (req, res) => {
  Comment.findById(req.params.commentId)
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
