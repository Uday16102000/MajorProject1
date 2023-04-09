const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create= async function(req,res){
    try{
        let post= await Post.findById(req.body.post)
        if(post){
           let comment=  await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id,
                postUser: req.params.userId, // set the post's user ID here
            });
           
                post.comments.push(comment);
                post.save();
                comment.save();
                // console.log(comment.user);
                res.redirect('/');
            }
        
    }catch(err){
       console.log('Error',err);
       return
    }
  
        }
    



module.exports.destroy= async function(req,res){
    try{
   let comment= await  Comment.findById(req.params.id).populate('post');
        
            if(comment.user == req.user.id || comment.post.user == req.user.id ){
                let postId=comment.post;
                comment.remove();
              let post= await  Post.findByIdAndUpdate(postId,{$pull:
                {
                    comments:req.params.id
                }})
                    return res.redirect('back');
                
            }else{
                return res.redirect('back')
            }
        }catch(err){
           console.log('Error',err);
            }
        }
        
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
