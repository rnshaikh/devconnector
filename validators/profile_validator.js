const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function validateProfileInput(data){

  let errors = {};
  data.handle = (data.handle )?data.handle :'';
  data.website = (data.website) ? data.website : '';
  data.company = (data.company) ? data.company : '';
  data.facebook = (data.facebook) ? data.facebook : '';
  data.youtube = data.youtube ? data.youtube : "";
  data.twitter = data.twitter ? data.twitter : "";
  data.instagram = data.instagram ? data.instagram : "";
  data.status = (data.handle) ? data.status : '';

  if(validator.isEmpty(data.handle)){
    errors.handle ="handle is required";
  }
  if(!validator.isLength(data.handle,{min:2,max:40})){
    errors.handle = "Handle length must be between 2 to 40 chars";
  }
  if(validator.isEmpty(data.status)) {
    errors.status= "Status is required";
  }

  if(validator.isEmpty(data.website)){
      if(validator.isURL(data.website)){
        errors.website = "website should valid URL."
      }
  }
  if (validator.isEmpty(data.youtube)) {
    if (validator.isURL(data.youtube)) {
      errors.youtube = "youtube should valid URL."
    }
  }
  if (validator.isEmpty(data.instagram)) {
    if (validator.isURL(data.instagram)) {
      errors.instagram = "instagram should valid URL."
    }
  }
  if (validator.isEmpty(data.twitter)) {
    if (validator.isURL(data.twitter)) {
      errors.twitter = "twitter should valid URL."
    }
  }
  if (validator.isEmpty(data.facebook)) {
    if (validator.isURL(data.facebook)) {
      errors.facebook = "facebook should valid URL."
    }
  }
  return {
    errors,
    isValid :isEmpty(errors)
  }
};