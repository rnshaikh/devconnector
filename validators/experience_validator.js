const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function validateExperienceInput(data) {

  let errors = {};
  data.title = (data.title) ? data.title : '';
  data.company = (data.company) ? data.company : '';
  data.from = (data.from) ? data.from : '';

  if (validator.isEmpty(data.title)) {
    errors.title = "title is required.";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "Company name is required.";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid : isEmpty(data)
  }

}
