const Comment = require('../models/comment');
const Post = require('../models/post');
// const User=require('../models/user');
const commentMailer = require('../mailers/comments_malers');
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post)
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
                // postUser: req.params.userId, // set the post's user ID here
            });

            post.comments.push(comment);
            post.save();
            // comment.save();
            comment = await comment.populate('user', 'name email');

            commentMailer.newComment(comment);
            if (req.xhr) {
                // comment = await comment.populate('user','name');
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Comment created!'
                })
            }


            req.flash('success', 'Comment created sucessfully!');
            // console.log(comment.user);

            return res.redirect('/');
        } else {
            req.flash('error', 'No ,Post Found!');
            return;
        }

    } catch (err) {
        console.log('Inside catch', err);
        req.flash('error', err);
        return res.redirect("back")
    }

}




module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id).populate('post');

        if (comment.user == req.user.id || comment.post.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, {
                $pull:
                {
                    comments: req.params.id
                }
            })
            req.flash('success', 'Comment Deleted Successfully!')
            return res.redirect('back');

        } else {
            return res.redirect('back')
        }
    } catch (err) {
        req.flash('error', err)
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
