const Validator = require('validator');
const validText = require('./valid-text');

module.exports = validateSearchInputData = data => {
  let errors = {};

  data.query = validText(data.query) ? data.query : '';

  if (Validator.isEmpty(data.query)){
    errors.query = 'Query is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}