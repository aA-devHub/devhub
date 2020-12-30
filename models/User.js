const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default:
        'https://res.cloudinary.com/willwang/image/upload/v1608418616/devhublogo_plnro3.png',
    },
    skills: [
      {
        skill: String,
        level: Number,
      },
    ],
    experience: [
      {
        start: Date,
        end: Date,
        company: String,
        position: String,
      },
    ],
    yearsOfExperience: Number,
    location: String,
    socials: [{ name: String, url: String }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },

  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('User', UserSchema);
