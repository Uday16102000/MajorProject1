const express= require('express');
const router= express.Router();
 //requiring the post controller because we need to make a route for it

  const postController= require('../controllers/posts_controller');
   
  router.post('/create',postController.create);

  module.exports=router;