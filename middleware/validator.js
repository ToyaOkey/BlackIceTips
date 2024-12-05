
const {body} = require('express-validator');
const {validationResult} = require('express-validator');


exports.validateId = (req, res, next) => {

    let id = req.params.id; 
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id: ' + id);
        err.status = 400;
        return next(err);
    }
    return next(); 
}

exports.validateSignUp = [   body('firstName', 'First name cannot be empty').notEmpty().trim().escape(), 
    body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(), 
    body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be atleast 8 characters and atmost 64 characters.').isLength({min: 8, max: 64}),
]

exports.validateLogIn =  [body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be atleast 8 characters and atmost 64 characters.').isLength({min: 8, max: 64})]


exports.validateResult = (req, res, next) => {
    let errors = validationResult(req); 
    if (!errors.isEmpty()) {
        errors.array().forEach( error => {
            req.flash('error', error.msg);
        })
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.validateUpdate = [
    body('title', 'Title cannot be empty')
        .notEmpty()
        .trim()
        .escape(),

    body('details', 'Content must have a length of at least 10 characters.')
        .isLength({ min: 10 })
        .trim()
        .escape(),

    body('condition', 'Invalid condition value.')
        .isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Pro']),

    body('price', 'Invalid price value. Price must be between 0.01 and 100.')
        .isFloat({ min: 0.01, max: 100 })
        .toFloat()
];

