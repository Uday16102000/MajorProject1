const Post= require('../../../models/post');
module.exports.index= async function(req,res)
{

    
   return res.json(200,{
        message:"List of Post  in API v2",

        posts:[]
    })
}