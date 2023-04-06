// require or import express
const express= require('express');
// const passport=require('passport');


//firing up router
const router=express.Router();

//requiring home_controller
const homeController= require('../controllers/home_controller');

//just for checking if it is loaded
console.log('router loaded');

//for accessing home function from home_controller
router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/assignment',require('./assignment'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//exporting router so that app can use it
module.exports=router;