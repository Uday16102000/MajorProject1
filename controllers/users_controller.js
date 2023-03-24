const User= require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
          console.log('No user_id found')
            }
            if(user){
                return res.render('user_profile',{
                    title:" User's Profile",
                    user:user
                })

            }
            return res.redirect('/users/signIn')
        })
    }else{
        return res.redirect('/users/signIn');
    }
    // res.render('user_profile',{
    //     title:"Profile"
    // })
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

module.exports.createSession= function(req,res){
    //steps to authenticate user
    //find the user

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            alert('user not found while signing in');
            console.log('error in finding user while signing in');
            return;
        }
        //handle user found
        if(user){
            //handle password which doesnt match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }else{
            //handle user not found
            res.redirect('back');
        }

    })
}

//signout
module.exports.signOut=function(req,res){
    User.deleteOne({_id: req.cookies.user_id},function(err){
        if(err){
        console.log('error in deleting user_id');
        return;
        }
        return res.redirect('/users/signIn');
        
    })
}