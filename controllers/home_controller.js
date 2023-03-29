module.exports.home=function(req,res){

    //for displaying without ejs
    // return res.end('<h1>Express is ready for Codeial</h1>');

    //for displaying with ejs

    //reading cookies
    console.log(req.cookies);

    //editing cookie
    res.cookie('user_id',34);
    return res.render('home1',{
        title:"Home"
    });
};