// require express
const express= require('express');

//firing express or running express
const app=express();

//by default website run on port 80
const port=9000;

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