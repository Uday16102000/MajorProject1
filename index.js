// require express
const express= require('express');

// requiring the installed cookie library
const cookieParser= require('cookie-parser');

// const db=require('./config/mongoose');

//firing express or running express
const app=express();

//by default website run on port 80
const port=9000;

// requiring layout
const expressLayouts= require('express-ejs-layouts');

//requiring db
const db= require('./config/mongoose');

//requiring express session for session cookie
const session= require('express-session');

//requiring passport
const passport= require('passport');

//requiring  passportLocal
const passportLocal=require('./config/passport_local_strategy');

//requiring mongo store
const MongoStore=require('connect-mongodb-session')(session);

//requiring node sass mideelware
// const sassMiddleware=require('node-sass-middleware');  



// app.use(sassMiddleware({
//     src:'./assets/scss',
//     dest:'./assets/css',
//     debug:true,
//     outputStyle:'extended',
//     prefix:'/css'
// }))
 
//reading through post request
app.use(express.urlencoded());
app.use(cookieParser());


//telling server to use assets folder
app.use(express.static('./assets'));

//informing server to use layouts
app.use(expressLayouts);

//extract style and script from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setting up view engine
 app.set('view engine','ejs');
 app.set('views','./views');

 //adding middleware which take the session cookie and encrypt it
 //mongo store is used to store session cookie in the db
 app.use(session({
    name:'codeial',
    //Todo change later while deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
     uri:'mongodb://0.0.0.0:27017/codeial_development',
      autoRemove:'disabled' 
    
    },
   
    function(err){
        console.log(err||'connect mongo db setup ok')
    })
 }));

 //telling the app to use passport
 app.use(passport.initialize());
 //because passport also help in creating session
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);




//use express router
app.use('/',require('./routes/index'));

//make app listen
app.listen(port,function(err){
    if(err){
        //normal way of printing
        console.log('Error:',err);

        //interpolation way of printing
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})