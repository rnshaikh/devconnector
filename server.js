const path = require('path');
const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// routers 
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require("./routes/api/posts");

app = express();

// body praser midddleware
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// mogo db connection
const db = require('./config/production').mongoURI;
mongoose
  .connect(db)
  .then(()=>console.log("DB connected"))
  .catch((err)=>console.log(`Error:${err}`));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);


if(process.env.NODE_ENV=='production'){

  app.use(express.static('client/build'))

  app.get('*', (req,res)=>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}



const port=process.env.PORT || 5000;

app.listen(port,()=>{console.log(`Server running on port ${port}`)});
