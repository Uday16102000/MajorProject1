const passport=require('passport');

//requiring passport local strategy library
const LocalStrategy=require('passport-local').Strategy;

//requiring user
const User=require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},function(email,password,done){
    //find user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding User==>passport');
            return done(err);
        }
        if(!user || user.password!=password ){
            console.log('Invalid Username / Password');
            return(null,false);
        }
        return done(null,user);
    })
}));

//serializing the user to decide which key is to be kept in cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//derialize the user from key in cookies
 passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding User==>passport');
            return done(err);
        }
        return done(null,user);

    })
 });

 //check if the user is authenticTED
 passport.checkAuthentication=function(req,res,next){
    //if the user is signed in then pass on the  request to the next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }
// if the user is not signed in
return res.redirect('/users/signIn');
 }
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookies and we are just sending this to the locals for view
        res.locals.user=req.user;
    }
    next();
}
 module.exports=passport;