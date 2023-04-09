const Post= require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res){
    //creating a post
    try{
        Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back')

    }catch(err){
        console.log('err in creating post');
        return;
    }
    

    // console.log(req.body.content)
    // console.log(req.body.user)
}

module.exports.destroy= async function(req,res){

    try{
        let post= await Post.findById(req.params.id)
        //.id means converting the object id into string
        if(post.user==req.user.id)
        {
            post.remove();

          await  Comment.deleteMany({
                post:req.params.id
           
           
            })
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error',err);
        return;

    }
}
  