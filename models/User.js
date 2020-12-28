const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // handle: {
    //   type: String,
    //   required: true
    // },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    // skills: {
    //   type: String,
    //   required: true
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('User', UserSchema);
