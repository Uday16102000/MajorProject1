const express= require('express');
const router= express.Router();
const assignmentController=require('../controllers/assignment_controller');
router.get('/diy',assignmentController.diy);




module.exports=router;
