const express = require('express');
const controller = require('../controllers/userController.js');
const {isGuest, isLoggedIn}  = require('../middleware/auth');
const {body} = require('express-validator');
const router = express.Router();

//GET /users/new: send html form for creating a new user account
router.get('/new', isGuest, controller.new);

//POST /users: create a new user account
router.post('/', isGuest,     
    [  
        body('firstName', 'First name cannot be empty').trim().escape(), 
        body('lastName', 'First name cannot be empty').trim().escape(),
        body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(), 
        body('password', 'password must be atleast 8 characters and at most 64 characters').isLength({ min: 8, max: 64 }), 
    ],

controller.create);

//GET /users/login: send html for logging in
router.get('/login', isGuest,  controller.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', 
    [  body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(), 
        body('password', 'password must be atleast 8 characters and at most 64 characters').isLength({ min: 8, max: 64 }), 
    ],
    isGuest,
controller.login);

//GET /users/profile: send user's profile page
router.get('/profile', isLoggedIn, controller.profile);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;