const Post=require('../models/post');
const Comment=require('../models/comment');
const user=require('../models/user');

module.exports.home=function(req,res){


Post.find({})
.populate('user')
.populate({
    path:'comments',populate:{
        path:'user'
    }
}).exec(function(err,posts){
    if(err){
        console.log("Error in finding posts:", err);
        return;
      }
    //   console.log("Posts found:", posts);
    return res.render('home1',{
        title:"Codeial|Home",
        posts:posts,
        
});

})
// console.log(comment.user);
}
    // return res.render('home1',{
    //     title:"Home"
    // }




        //for displaying without ejs
    // return res.end('<h1>Express is ready for Codeial</h1>');

    //for displaying with ejs

    //reading cookies
    // console.log(req.cookies);

    //editing cookie
    // res.cookie('user_id',34);

    //for displaying post
//     Post.find({},function(err,posts){
//         return res.render('home1',{
//             title:"Codeial|Home",
//             posts:posts
//     });
// });
// Post.find({}).populate('user').exec(function(err,posts){
//     if(err){
//         console.log("Error in finding posts:", err);
//         return;
//       }
//     //   console.log("Posts found:", posts);
//     return res.render('home1',{
//         title:"Codeial|Home",
//         posts:posts
// });

// })
// }