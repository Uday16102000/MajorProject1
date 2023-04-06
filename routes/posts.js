const express= require('express');
const router= express.Router();

//as we are using passport for authentication in a way that user is present then only display post box so we require import passport

const passport=require('passport');


 //requiring the post controller because we need to make a route for it

  const postController= require('../controllers/posts_controller');
   
  router.post('/create',passport.checkAuthentication,postController.create);
  router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

  module.exports=router;