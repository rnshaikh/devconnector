const express = require("express");
const User = require('../models/User');
const Profile = require('../models/Profile');
const validateProfileInput = require('../validators/profile_validator'); '../validators/profile_validator'
const valdateExperienceInput = require("../validators/experience_validator");
const valdateEducationInput = require("../validators/experience_validator");


exports.getCurrentProfile = function(req,res){
  userid = req.user.id;  
  Profile.findOne({user:req.user.id}).
    then(profile =>{
      if(!profile){
        res.status(400).json("User profile does not exist");
      }
      res.json(profile);
    }).
    catch(err=>{
      res.status(500).json(err);
    });
}

exports.createUpdateProfile = function(req,res){
  console.log("increteupdate function");
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  console.log(isValid);
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // Skills - Spilt into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};
exports.getProfileByHandle = function(req,res){

  let handle = req.params.handle;
  Profile.findOne({handle: handle})
  .then(profile =>{
    if(!profile){
      res.status(404).json("profile for given handle not found");
    }
    res.json(profile);
  })
  .catch(err =>{
    console.log(err);
  })
}
exports.getProfileByUserid = function(req,res){
  
  let user_id = req.params.user_id;
  Profile.findOne({ user: user_id})
    .then(profile => {
      if (!profile) {
        res.status(404).json("profile for given handle not found");
      }
      res.json(profile);
    })
    .catch(err => {
      console.log(err);
    })
}
exports.getAllProfile = function(req,res){
  Profile.find().then(profiles => {
    if(!profiles){
      res.status(404).json("Not Found Any Profile");
    }
    res.json(profiles);
  })
  .catch(err =>{
    console.log(err);
  })
}
exports.addExperience = function(req,res){
  const {errors,isValid} = valdateExperienceInput(req.body);
  console.log(errors,isValid);
  if (isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to exp array
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  });
}

exports.addEducation = function(req,res){
  // const { errors,isValid} = valdateEducationInput(req.body);
  // if (isValid) {
  //   // Return any errors with 400 status
  //   return res.status(400).json(errors);
  // }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to exp array
    profile.education.unshift(newEdu);

    profile.save().then(profile => res.json(profile));
  });
}






























