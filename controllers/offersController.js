const express = require('express')
const Offer = require('../models/offers'); 
const router = express.Router();
const Item = require('../models/blackice');
const User = require('../models/user');
const {validationResult} = require('express-validator');


exports.makeOffer = async (req, res, next) => {
    // console.log(req.body);  
    // console.log("WE MADE IT TO THE POST");



    try {
        let id = req.params.id; 
        let user = req.session.user; 
        let amount = req.body.amount;

        let errors = validationResult(req); 
        if (!errors.isEmpty()) {
            errors.array().forEach( error => {
                req.flash('error', error.msg);
            });
            return res.redirect(`/items/${id}`);
        }
    
        // if user not logged 
        if (!user) {
            return res.redirect('/users/login');
        }

        

        let item = await Item.findById(id);
        console.log(item.title);
        if (!item) {
            let err = new Error('Item is not found.');
            err.status = 404;
            return next(err);
        }
        // console.log("user" + user);
        if (item.seller == user) {
            let err = new Error('You cannot make an offer as the seller! This is NOT monopoly.');
            err.status = 401;
            return next(err);
        }
        
        const offer = await Offer.create({
            amount,
            user: user,
            item: id
        });
        console.log(offer);
        await Item.findByIdAndUpdate(id, {
            $inc: { totalOffers: 1 },
            $max: { highestOffer: amount }
        });
        
        req.flash('success', `You have successfully added an offer  with the price of ${amount}`); 
        res.redirect(`/items/${id}`);
    } catch (err) {
        next(err);
    }
};



    
exports.viewOffers = async (req, res, next) => {
    try {
        let user = req.session.user; 
        let itemId = req.params.id;
        

        if (!user) {
            return res.redirect('/users/login');
        }
        
        let item = await Item.findById(itemId);
        

        if (!item) {
            const err = new Error('Item not found.');
            err.status = 404;
            return next(err);
        }

        if (item.seller.toString() !== user.toString()) {
            const err = new Error('You do not have authorization to view this page.');
            err.status = 401;
            return next(err);
        }

        const offers = await Offer.find({ item: itemId })
        .populate('user', 'firstName lastName')
        .sort({ amount: -1 });

        // const updatedOffers = await Promise.all(
           
        //     offers.map(async (offer) => {
                
        //         const offerUser = await User.findById(offer.user.toString()).populate('firstName');
        //         // console.log(offerUser)
        //         // if (offerUser) {
        //         //     offer.user = `${offerUser.firstName} ${offerUser.lastName}`;
        //         // } else {
        //         //     offer.user = 'User deleted';
        //         // }
                
        //     })
        // );

        console.log(offers); 
        // offers = await Offer.find({ item: id }).populate('item', 'title');
        res.render('offers/offers', { item, offers });
    } catch (err) {
        next(err);
    }
};


exports.acceptOffer = async (req, res, next) => {
    try {
        const user = req.session.user; 
        let itemId = req.params.id;
        const offerId = req.params.offerId;

        if (!user) {
            return res.redirect('/users/login');
        }

        const item = await Item.findById(itemId);

        if (!item) {
            const err = new Error('Item not found.');
            err.status = 404;
            return next(err);
        }

        
        if (item.seller.toString() !== user.toString()) {
            const err = new Error('You do not have permission to do this action.');
            err.status = 401;
            return next(err);
        }

       
        const offer = await Offer.findById(offerId);

        if (!offer || offer.item._id.toString() !== itemId) {
            const err = new Error('This offer id is not found.');
            err.status = 404;
            return next(err);
        }

        
        offer.status = 'accepted';
        await offer.save();

        
        item.active = false;
        await item.save();

        
        await Offer.updateMany(
            { item: itemId, _id: { $ne: offerId } },
            { status: 'rejected' }
        );

        req.flash('success', 'Offer accepted successfully.');
        res.redirect(`/items/${itemId}/offers`);
    } catch (err) {
        next(err);
    }
};
