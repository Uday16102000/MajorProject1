const express= require('express');
// const passport=require('passport');


//firing up router
const router=express.Router();
router.use('/posts',require('./posts'));
router.use('/users',require('./users'))
module.exports=router;