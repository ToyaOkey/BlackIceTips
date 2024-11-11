const Item = require('../models/blackice'); 


exports.isGuest = (req, res, next) => {
    if(!req.session.user){
        return next();
    } else {
        req.flash('error', 'You are logged in already.');
        return res.redirect('/users/profile');
    }
};


exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        console.log(req.session.user);
        return next();
    } else {
        req.flash('error', 'You need to login first.');
        return res.redirect('/users/login');
    }
};

exports.isAuthor = (req, res, next) => {
    let id = req.params.id; 

    Item.findById(id)
    .then(item => {
        
        if(item){
            
            if(item.seller == req.session.user){
                return next(); 
            
        } else {
            
            let err = new Error('Unauthorized to access the resource');
            err.status = 401; 
            return next(err);
        }
    } else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404; 
        next(err);
    }
    })
    .catch(err => next(err));
};