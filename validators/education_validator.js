const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function validateEducationInput(data) {

  let errors = {};
  data.school = (data.school) ? data.school : '';
  data.degree = (data.degree) ? data.degree : '';
  data.fieldofstudy = (data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = data.from ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "title is required.";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Company name is required.";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Company name is required.";
  } 
  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(data)
  }

}
