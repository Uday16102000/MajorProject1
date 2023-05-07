const mongoose=require('mongoose');
const likeSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },

    //this define theobject id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'
    
    },
    ///this field is used to defind the type of like object since it is a dynamic model
     onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
     }

},{timestamps:true});

const Like=mongoose.model('Like',likeSchema);
module.exports=Like;