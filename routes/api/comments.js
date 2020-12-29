const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comment = require('../../models/Comment');
const validateComment = require('../../validation/comments');

// router.get('/', (req, res) => {
//   Comment.find
// });
