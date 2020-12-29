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
    imageUrl: {
      type: String,
      required: true,
    },
    skills: [
      {
        skill: String,
        level: Number,
      },
    ],
    experience: [
      {
        time: String,
        company: String,
        position: String,
      },
    ],
    socials: [{ name: String, url: String }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('User', UserSchema);
