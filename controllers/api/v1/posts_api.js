const Post= require('../../../models/post')
const Comment=require('../../../models/comment');
module.exports.index= async function(req,res)
{

    
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',populate:{
                path:'user post'
            }
        })
   return res.json(200,{
        message:"List of Post",
        posts:posts
    })
}
module.exports.destroy= async function(req,res){

    try{
        console.log("Inside destroy")
        let post= await Post.findById(req.params.id)
        if(post){

        
        //.id means converting the object id into string
        if(post.user==req.user.id)
        {
            post.remove();

          await  Comment.deleteMany({
                post:req.params.id
           
           
            })
            console.log("post is going to be deleted via api call")
            return res.status(200).json({
                message:"post and associated comment deleted succesfully"
            });
        }else{
            return res.json(401,{
                message:"You cannot delete this post"
            })
        }
    }else{
        return res.status(200).json({
            message:"The post is not found"
        })
    }
    }
    catch(err){
    //    req.flash('error',err);
    console.log(err)
        return res.status(500).json({
          
            message:"Internal server error"
    })
    }

}