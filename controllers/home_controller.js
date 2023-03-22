module.exports.home=function(req,res){

    //for displaying without ejs
    // return res.end('<h1>Express is ready for Codeial</h1>');

    //for displaying with ejs
    return res.render('home',{
        title:"Home"
    });
};