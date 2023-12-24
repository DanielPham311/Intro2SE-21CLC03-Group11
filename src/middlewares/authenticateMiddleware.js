module.exports = {
    isAuth: (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login')
        }
    },
    isAdmin: (req, res, next) => {
        if(req.isAuthenticated() && req.user.role == 'admin') {
            next();
        } else {
            res.status(401).json({message: 'You are not authorized'});
        }
    }
};
