const passport=require('passport');

const googleStrategy= require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport tp create new strategy for google login
passport.use(new googleStrategy({
    clientId:"318543414695-ci6t9h5hvnr8rnbc8m2vp8k0ct8feje6.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:9000/auth/google/callback"

},
function(accessToken,refreshToken,profile,done)
{//find user
    User.findOne({email:profile.emails[0].value}).exec(function(err, user)
    {
        if(err)
        {
            console.log("error in google strategy passport",err);;L
            return;
        }
        console.log(profile);
        //if found ,set user as req.user
        if(user)
        {
            return done(null,user)
        }
        else{
            //if not found create the user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err)
        {
            console.log("error in creating google strategy passport",err);
            return;
        }
        return done(null,user)
            })
        }
    }
)}
))
module.exports=passport;