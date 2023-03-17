// require or import express
const express= require('express');

//firing up router
const router=express.Router();

//requiring home_controller
const homeController= require('../controllers/home_controller');

//just for checking if it is loaded
console.log('router loaded');

//for accessing home function from home_controller
router.get('/',homeController.home);

//exporting router so that app can use it
module.exports=router;