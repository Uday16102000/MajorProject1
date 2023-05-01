
const express= require('express');
// const passport=require('passport');


//firing up router
const router=express.Router();
// const passport=require('passport');
const postsApi=require("../../../controllers/api/v1/posts_api");
const passport = require('passport');

router.get('/',postsApi.index);
//session false inidcate that the expression session cookie should not be generated
router.delete('/:id',passport.authenticate('jwt',{
    session:false
}),postsApi.destroy)
module.exports=router;