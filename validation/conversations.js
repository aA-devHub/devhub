const Validator = require('validator');
// const validText = require('./valid-text');

module.exports = function validateConversation(data) {
  let errors = {};

  if (Validator.isEmpty(data.particiipants)) {
    errors.text = 'Participants required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
