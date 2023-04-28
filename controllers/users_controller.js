const User= require('../models/user');
const fs=require('fs');
const path=require('path');
//lets keep it as before no async await
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        res.render('user_profile1',{
            title:" User Profile",
            profile_user:user
    })
   
    })
    // res.end('<h1>User Profile</h1>');
}

module.exports.update= async function(req,res){
    // if(req.user.id== req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send("Ünauthorized");
    // }

    if(req.user.id == req.params.id)
    {
        try{
            let user= await User.findById(req.params.id);
            //with req.params.id we cant acess further form because we are having multiform now
            //so we have added multer function which baccept req and will continue further code
            User.uploadedAvatar( req,res,function(err){
                if(err)
                {
                    console.log('****Multer Error:' ,err);
                }
user.name=req.body.name;
user.email=req.body.email;

if(req.file){
    console.log(req.file);
//if avatar is already present then remove it
    if(user.avatar)
    {
fs.unlinkSync(path.join(__dirname, '..',user.avatar))
    }
    //this is saving the path of the uploaded file in the avatar field in the user
    user.avatar=User.avatarPath +'/'+ req.file.filename;
}
user.save();
return res.redirect('back');
            })
        }catch(err){
            req.flash('error',err);
            return res.redirect('back')
        }
    }else{
            return res.status(401).send("Ünauthorized");
        }
}
//singUp render
 module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
     res.render('user_sign_up',{
        title:"Codeial|SignUp"
    })
}

//signin rendering
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
                req.flash('success','New User Created')
                return res.redirect('/users/signIn');
            })
        
        }else{
           
            return res.redirect('back');
        }
    })
}

//signIn and create session for user
 module.exports.createSession= function(req,res){
    req.flash('success','Logged In Succesfully!');
    // console.log(req.user)
    return res.redirect('/');
 }


 //creating a signout action
 module.exports.destroySession=function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    req.flash('success','You are Logged Out!');
    return res.redirect('/');
 }

