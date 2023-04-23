const Post= require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');

module.exports.create= async function(req,res){
    //creating a post
    try{
       
     let post =  await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        post = await post.populate('user','name');
     
        if(req.xhr)
        {
          
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'Post created!'
            })
        }
        req.flash('success','Post created successfully!');
        return res.redirect('back')

    }catch(err){
       req.flash('error',err);
       return res.redirect('back')
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
            req.flash('success','Post Deleted Successfully');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
       req.flash('error',err);
        return;

    }
}
  