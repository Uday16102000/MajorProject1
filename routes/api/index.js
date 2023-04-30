const express= require('express');
// const passport=require('passport');


//firing up router
const router=express.Router();
router.use('/v1',require('./v1'));

module.exports=router;