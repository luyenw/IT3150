exports.checkAdminRole = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.role == 0){
            next()
        }else{
            return res.redirect('/')
        }
    }else{
        return res.redirect('/')
    }
}