const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({

  user : {
    type:Schema.Types.ObjectId,
    ref:'users'
  },

  text : {
      type: Schema.Types.String,
  },
  name : {
      type:Schema.Types.String,
  },
  avatar : {
      type: Schema.Types.String
  },

  date:{
    type:Schema.Types.Date,
    default:Date.now
  },

  likes : [
      {
          user:{
              type:Schema.Types.ObjectId,
              ref:'users'
          }
      }
  ],
  comments :[
      {
        user:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },

        avatar:{
            type:Schema.Types.String,
        },
        name : {
            type:Schema.Types.String,
        },
        text: {
            type:Schema.Types.String
        },
        date:{
            type:Schema.Types.Date,
            default:Date.now
        }
      }
  ]
  
})

module.exports = Post= mongoose.model('post',PostSchema);