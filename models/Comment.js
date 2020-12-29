const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    projectId: {
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
