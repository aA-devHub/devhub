const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  github_link: String,
  live_link: String,
  description: String,
  mobile: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  images: {
    hero: String,
    secondaries: [String],
  },
  ui: {
    color: String,
    overview_layout: Number,
    features_layout: Number,
    language_layout: Number,
  },
  browsers: [String],
  features: [
    {
      title: String,
      description: String,
      image: String,
    },
  ],
  future_features: [
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
