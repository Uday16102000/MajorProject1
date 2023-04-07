const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id,
                postUser: req.params.userId, // set the post's user ID here
            },
            function(err,comment){
                post.comments.push(comment);
                post.save();
                comment.save();
                // console.log(comment.user);
                res.redirect('/');
            })
        }
    })
}


module.exports.destroy=function(req,res){
    Comment.findById(req.params.id).populate('post').exec(function(err,comment){
            if(comment.user == req.user.id || comment.post.user==req.user.id ){
                let postId=comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull:
                {
                    comments:req.params.id
                }},function(err,post){
                    return res.redirect('back');
                })
            }else{
                return res.redirect('back')
            }})
        
    // Comment.findById(req.params.id,function(err,comment){
    //     if(comment.user == req.user.id || comment.post.user==req.user.id ){
    //         let postId=comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId,{$pull:
    //         {
    //             comments:req.params.id
    //         }},function(err,post){
    //             return res.redirect('back');
    //         })
    //     }else{
    //         return res.redirect('back')
    //     }
    // })
}