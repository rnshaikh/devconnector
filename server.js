const express =require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require("./routes/api/posts");

app = express();

const db = require('./config/keys').mongoURI;
/*mongoose
  .connect(db)
  .then(()=>console.log("DB connected"))
  .catch((err)=>console.log(`Error:${err}`));
*/
app.get('/',(req,res)=>res.json({he:"Hello"}));
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);
const port=process.env.PORT || 5000;

app.listen(port,()=>{console.log(`Server running on port ${port}`)});