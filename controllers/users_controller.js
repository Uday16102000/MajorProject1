const User= require('../models/user');

module.exports.profile=function(req,res){
    res.render('user_profile',{
        title:"Profile"
    })
    // res.end('<h1>User Profile</h1>');
}
//singUp render
 module.exports.signUp=function(req,res){
     res.render('user_sign_up',{
        title:"Codeial|SignUp"
    })
}

//signin rendering
module.exports.signIn=function(req,res){
     res.render('user_sign_in',{
        title:"Codeial|SignIn"
    })
}

//get the signupdata
module.exports.create=function(req,res){
    if(req.body.password!= req.body.confirm_password){
        res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;

                }
                return res.redirect('/users/signIn');
            })
        
        }else{
            return res.redirect('back');
        }
    })
}