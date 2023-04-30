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
        let post= await Post.findById(req.params.id)
        //.id means converting the object id into string
        // if(post.user==req.user.id)
        {
            post.remove();

          await  Comment.deleteMany({
                post:req.params.id
           
           
            })
            
            return res.json(200,{
                message:"post and associated comment deleted succesfully"
            });
        // }else{
        //     return res.redirect('back');
        // }
    }}
    catch(err){
    //    req.flash('error',err);
    console.log(err)
        return res.json(500,{
          
            message:"Internal server error"
    })
    }

}