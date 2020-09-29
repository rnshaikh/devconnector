const validator = require('validator');

const isEmpty =require('./is-Empty.js');


module.exports=function validateRegisterInput(data){
  let errors = [];
  data.name = (data.name)? data.name : '';
  data.email = (data.email) ? data.email : '';
  data.password = (data.password) ? data.password : '';
  data.confirmPassword = (data.confirmPassword) ? data.confirmPassword : '';

  if(!validator.isLength(data.name,{min:4,max:30})){
    errors.push("name should be 4 to 30 chars long");
  }
  if(validator.isEmpty(data.name)){
    errors.push("name is required.");
  }
  if (validator.isEmpty(data.email)) {
    errors.push("email is required.");
  }
  
  if(!validator.isEmail(data.email)){
    errors.push("Email should be valid");
  }
  if(validator.isEmpty(data.password)){
    errors.push("Password is required");
  }
  if(validator.isEmpty(data.confirmPassword)) {
    errors.push(" Confrim Password is required");
  }
  if(!validator.isLength(data.password,{min:5,max:12})){
    errors.push("Password shouldbe 5 to 12 chars long");
  } 
  if(!validator.equals(data.password,data.confirmPassword)){
    errors.push("Confrim password did not match with Password"); 
  }

  return {
    errors,
    isValid : isEmpty(errors)
  }

};

