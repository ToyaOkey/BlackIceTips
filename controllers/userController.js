const model = require('../models/user');
const Item = require('../models/blackice');
exports.new = (req, res)=>{
    return res.render('./user/new');
};

exports.create = (req, res, next)=>{
        
        let user = new model(req.body);
        
        user.save()
        .then(user=> {
            req.flash('success', 'Registration successful!');
            res.redirect('/users/login')
        })
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);  
                return res.redirect('/users/new');
            }
    
            if(err.code === 11000) {
                req.flash('error', 'This email has already been registered. Consider logging in.');  
                return res.redirect('/users/new');
            }
            
            next(err);
        }); 


};

exports.getUserLogin = (req, res, next) => {
    if(!req.session.user){
        return res.render('./user/login');
    } else {
        req.flash('error', 'You are logged in already.');
        return res.redirect('/users/profile');
    }
    
}

exports.login = (req, res, next)=>{
   
    let email = req.body.email;
    let password = req.body.password;
    
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            // console.log('wrong email address');
            req.flash('error', 'Email address not found.');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in!');
                    req.session.save(() => {
                        // res.redirect('/users/login');
                        res.redirect('/users/profile');
                    });                    
                    

            } else {
                req.flash('error', 'Incorrect Password!');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};


exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Item.find({seller: id})])
    .then(results=>{
        const [user, services] = results; 

        res.render('./user/profile', {user, services})
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };



