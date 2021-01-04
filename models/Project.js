const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  githubLink: String,
  liveLink: String,
  description: String,
  mobile: Boolean,
  numFavorites: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  images: {
    hero: String,
    secondaries: [String],
  },
  ui: {
    color: String,
    overviewLayout: Number,
    featuresLayout: Number,
    languageChart: Number,
  },
  browsers: [String],
  technologies: [String],
  features: [
    {
      title: String,
      description: String,
      image: String,
    },
  ],
  futureFeatures: [
    {
      title: String,
      description: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Project = mongoose.model('Project', ProjectSchema);
