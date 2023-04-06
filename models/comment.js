const mongoose= require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // comments belong to user so add user in comment schema
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})
//telling mongoose that this is going to be collection
const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;