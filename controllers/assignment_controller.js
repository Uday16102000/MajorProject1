module.exports.diy= function(req,res){
    // res.end('<h1>Assignment Displayed!</h1>')
    res.render('assignment',{
        title:"Assignment"
    })
}