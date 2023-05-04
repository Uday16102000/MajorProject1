const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');

module.exports.home=async function(req,res){
try{
let posts=await Post.find({})
.sort('-createdAt')
.populate('user')
.populate({
    
    path:'comments',populate:{
        path:'user'
    }
})
// console.log(posts);
let users= await User.find({});

return res.render('home1',{
    title:"Codeial|Home",
    posts:posts,
    all_users:users

})

    // return res.status(200).json({
    //     title:"Codeial|Home",
    //     posts:posts,
    //     all_users:users
    // })
}catch(err){

        console.log('Error',err)
        return;
}

    
}

// Post.find({})
// .populate('user')
// .populate({
//     path:'comments',populate:{
//         path:'user post'
//     }
// }).exec(function(err,posts){

//     User.find({},function (err,users){
//         if(err){
//             console.log("Error in finding users:", err);
//             return;
//           }
       
//         return res.render('home1',{
//             title:"Codeial|Home",
//             posts:posts,
//             all_users:users

//     })
   
        
// });


// console.log(comment.user);

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