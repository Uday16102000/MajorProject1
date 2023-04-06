//requiring mongoose
const mongoose = require('mongoose');

//providiing connection to databse
mongoose.connect('mongodb://0.0.0.0:27017/codeial_developmentUday');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MONGOdB"));
db.once('open',function(){
    console.log('Connected to database :: mONGODB');
});
 module.exports=db;
