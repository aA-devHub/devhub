const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateProject(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 1, max: 140 })) {
    errors.text = 'Titles must be between 5 and 140 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = function validateProjectUpdate(data) {
  let errors = {};

  if (Validator.isEmpty(data._id)) {
    errors.text = 'Project _id field is required';
  }

  if (Validator.isEmpty(data.user)) {
    errors.text = 'Project user field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
