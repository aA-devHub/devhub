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
      default: 'Software Engineer',
    },
    bio: {
      type: String,
      default:
        'This is my bio! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    imageUrl: {
      type: String,
      default:
        'https://res.cloudinary.com/willwang/image/upload/v1608418616/devhublogo_plnro3.png',
    },
    skills: {
      type: Map,
      of: Number,
      default: { devhub: 10 },
    },
    experience: [
      {
        start: Date,
        end: Date,
        company: String,
        position: String,
      },
    ],
    notifications: {
      messages: { type: Number, default: 0 },
      other: [
        {
          source: String,
          userName: String,
          projectId: Schema.Types.ObjectId,
          projectName: String,
          imageUrl: String,
        },
      ],
    },
    yearsOfExperience: Number,
    location: String,
    socials: {
      type: Map,
      of: String,
      default: null,
    },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
  },

  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('User', UserSchema);
