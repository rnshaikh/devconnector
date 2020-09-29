const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function validatePostInput(data){
    
    let errors = {};
    data.text = data.text? data.text : "";
    
    if(validator.isEmpty(data.text)){
        errors.handle ="handle is required";
    }  
    
    return {
        errors,
        isValid :isEmpty(errors)
      }

}