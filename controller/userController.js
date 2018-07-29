const User = require('../models/User');
const gravatar= require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput= require('../validators/register');
const validateLoginInput = require('../validators/login');
exports.register= function (req, res){

  const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
      res.status(404).json({errors});
    }
      User.findOne({email:req.body.email})
      .then(user=>{ 
        if(user){
          res.status(400).json({email:"Email Already Existed"});
        }
        else{
            const avatar = gravatar.url(req.body.email,
                                    {s:'200',r:'pg',d:'200'}); 
            const newUser = new User({
              email:req.body.email,
              name:req.body.name,
              password:req.body.password,
              avatar
            })
          bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
              if(err){ throw err;}
              newUser.password=hash;
              newUser.save().then(user =>{ res.json(user)})
              .catch(err => { console.log(err)});
            })
          })  
        }

    })
    .catch(err => { console.log(err)});
};
exports.login =  function (req,res){
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(404).json({ errors });
  }

  email = req.body.email;
  password= req.body.password;
  User.findOne({email})
    .then(user =>{
      if(!user){
         res.status(404).json("User Not Found");
      }
      bcrypt.compare(password,user.password)
      .then(isMatch =>{
          if(isMatch){
            //res.json(`User logged in`);
            const payload = { 
              id:user.id,
              name:user.name,
              avatar:user.avatar}
            
            jwt.sign(payload,keys.secretorkey,
              {expiresIn:3600},
              (err,token)=>{
              res.json({
                success:true,
                token : 'Bearer '+token
              });
            });
          }
          else{
            res.status(404).json({error:"email and password is incorrect."});
          }
      })
      .catch(err =>{
        console.log(err);
      });

    })
    .catch(err =>{
      console.log(err);
    });
};

