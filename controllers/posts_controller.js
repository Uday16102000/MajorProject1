const Post= require('../models/post')

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
