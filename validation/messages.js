const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateMessage(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : '';

  if (Validator.isEmpty(data.body)) {
    errors.text = 'Message text required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
