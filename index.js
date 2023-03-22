// require express
const express= require('express');

//firing express or running express
const app=express();

//by default website run on port 80
const port=9000;

// requiring layout
const expressLayouts= require('express-ejs-layouts');

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