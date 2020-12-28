const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  github_link: String,
  live_link: String,
  description: String,
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
  features: [{ title: String, description: String, image: String }],
  mobile: Boolean,
  browsers: [String],
  future_features: [{ title: String, description: String }],
  user: {
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Project = mongoose.model('Project', ProjectSchema);
