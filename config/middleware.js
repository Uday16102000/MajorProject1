module.exports.setFlash=function(req,res,next)
{
    res.locals.flash=
    {
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}
//to use this middle ware go to index.js and require it
