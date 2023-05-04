const passport= require('passport');
//requirig the installed passport-jwt
const JWTStrategy= require('passport-jwt').Strategy;

//requiring the extract jet for extracting jwt from header
const ExtractJWT= require('passport-jwt').ExtractJwt

//as we are performing authentication on user import UASER
const User= require('../models/user');

let opts={

    //header have set of key inside that one is auth ,authe have set of key one is bearer
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err)
        {
            console.log('Error in finding user from JWT');
        return;
        }
        else if(user)
        {
            return done(null,user)
        }
        else
        {
            return done(null,false)
        }
    })
}))
module.exports=passport;