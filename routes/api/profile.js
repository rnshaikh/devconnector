const express = require('express');
const router = express.Router();
const passport = require('passport');
const profile_controller = require('../../controller/profileController');
const validateProfileInput = require("../../validators/profile_validator");


router.get('/test', (req, res) => res.json({ msg: "profile ok" }) );
router.get('/profile',
          passport.authenticate('jwt',{session:false}),
          profile_controller.getCurrentProfile);

router.get('/github/:username',
          passport.authenticate('jwt',{session:false}),
          profile_controller.getGithubRepos);

router.delete('/profile', passport.authenticate('jwt',{session:false}),
             profile_controller.deleteProfile)
router.post('/createupdateprofile',
      passport.authenticate('jwt',{session:false}),
      profile_controller.createUpdateProfile);

router.get('/handle/:handle',
            profile_controller.getProfileByHandle);
      
router.get('/user/:user_id',
      profile_controller.getProfileByUserid);

router.get('/all',
      profile_controller.getAllProfile);

router.post('/addexperience', passport.authenticate('jwt', { session: false }), profile_controller.addExperience);

router.post('/addEducation', passport.authenticate('jwt', { session: false }), profile_controller.addEducation);

router.post('/addEducation', passport.authenticate('jwt', { session: false }), profile_controller.addEducation);

router.delete('/experience/:experience_id', passport.authenticate('jwt', { session: false }), profile_controller.deleteExperience)

router.delete('/education/:education_id', passport.authenticate('jwt', { session: false }), profile_controller.deleteEducation)

module.exports = router;
