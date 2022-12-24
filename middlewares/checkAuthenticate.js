exports.checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) res.redirect('/')
    else next();
}
exports.checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        next()    
    } else{
        console.log('not authen')
        res.redirect('/')
    }
}