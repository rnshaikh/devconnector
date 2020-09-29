const express = require('express');
const router = express.Router();
const passport = require('passport');
const post_controller = require('../../controller/postController');


router.get('/test', (req, res) =>  res.json({ msg: " posts ok" }) );
router.post('/',
      passport.authenticate('jwt',{session:false}),
      post_controller.createPost);

router.get('/:id',
      passport.authenticate('jwt',{session:false}),
      post_controller.getPostById);


router.delete('/:id',
      passport.authenticate('jwt',{session:false}),
      post_controller.deletePostById);

router.get('/',
      passport.authenticate('jwt',{session:false}),
      post_controller.getPosts);

router.put('/like/:id',
      passport.authenticate('jwt',{session:false}),
      post_controller.postLike);

router.put('/unlike/:id',
      passport.authenticate('jwt',{session:false}),
      post_controller.postUnlike);

router.post('/comment/:id',
      passport.authenticate('jwt',{session:false}),
      post_controller.createComment);

router.delete('/comment/:id/:comment_id',
      passport.authenticate('jwt',{session:false}),
      post_controller.removeComment);




module.exports = router;
