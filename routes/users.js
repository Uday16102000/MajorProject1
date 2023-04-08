const express = require('express');
const router= express.Router();
//import passport
const passport= require('passport');

const userController=require('../controllers/users_controller');




// router.get('/profile',userController.profile);
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/signUp', userController.signUp);
router.get('/signIn',userController.signIn);

router.post('/create',userController.create);
//route for creating session and it uses passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/signIn'
    },
),userController.createSession);
router.get('/signOut',userController.destroySession);

module.exports=router;