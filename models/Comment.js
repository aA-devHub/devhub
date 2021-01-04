const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    userName: {
      type: String,
      default: 'Silly Sally',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    body: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Comment = mongoose.model('Comment', CommentSchema);
