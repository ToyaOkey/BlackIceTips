const express = require('express'); 
const controller = require('../controllers/offersController');
const router = express.Router({mergeParams: true}); 
const {isLoggedIn, isAuthor}  = require('../middleware/auth')
const {body} = require('express-validator');

// POST /items/:id/offers
router.post('/', isLoggedIn, 
    [
        body('amount', 'This is not a proper amount').isCurrency(),
    ],
    controller.makeOffer);



// GET /items/:id/offers

router.get('/', isLoggedIn, isAuthor, controller.viewOffers);


// POST /items/:id/offers/:offerId

router.post('/:offerId', isLoggedIn, isAuthor, controller.acceptOffer);


module.exports = router; 