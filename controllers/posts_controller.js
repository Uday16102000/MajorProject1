const Post= require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    //creating a post
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('err in creating post');
            return;
        }
        return res.redirect('back')
    })

    // console.log(req.body.content)
    // console.log(req.body.user)
}

module.exports.destroy= function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.id means converting the object id into string
        if(post.user==req.user.id)
        {
            post.remove();

            Comment.deleteMany({
                post:req.params.id
            },function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}
