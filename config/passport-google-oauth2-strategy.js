const passport=require('passport');

// const googleStrategy= require('passport-google-oauth2').OAuth2Strategy;
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport tp create new strategy for google login
passport.use(new googleStrategy({

    clientID: '696232805011-r68goccr6dt404jv80v98qk2kdibrhe2.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:9000/users/auth/google/callback",
    // passReqToCallback:true

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
// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const crypto = require('crypto');
// const User = require('../models/user');


// // tell passport to use a new strategy for google login
// passport.use(new googleStrategy({
//         clientID: '696232805011-r68goccr6dt404jv80v98qk2kdibrhe2.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
//         clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
//         callbackURL: "http://localhost:9000/users/auth/google/callback",
//     },

//     function(accessToken, refreshToken, profile, done){
//         // find a user
//         User.findOne({email: profile.emails[0].value}).exec(function(err, user){
//             if (err){console.log('error in google strategy-passport', err); return;}
//             console.log(accessToken, refreshToken);
//             console.log(profile);

//             if (user){
//                 // if found, set this user as req.user
//                 return done(null, user);
//             }else{
//                 // if not found, create the user and set it as req.user
//                 User.create({
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     password: crypto.randomBytes(20).toString('hex')
//                 }, function(err, user){
//                     if (err){console.log('error in creating user google strategy-passport', err); return;}

//                     return done(null, user);
//                 });
//             }

//         }); 
//     }


// ));


// module.exports = passport;
