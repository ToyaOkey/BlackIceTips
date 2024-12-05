const express = require('express'); 
const model = require('../models/blackice'); 
const router = express.Router();
// const multer = require('multer');
const {upload} = require('../middleware/fileUpload');
const Offer = require('../models/offers');
const {body} = require('express-validator');

const {validationResult} = require('express-validator');
const multer = require('multer');
const validator = require('validator');



exports.index = (req, res, next) => {
    // console.log(req.query.query);
    const searchQuery = req.query.query;

    let query = {};

    // check if anything is ? and after
    if (searchQuery !== undefined) {
        // case insensitive search | if nothing should return empty {} thingy
        // https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
        query = {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } }, 
                { details: { $regex: searchQuery, $options: 'i' } }
            ]
        };
    }
    // this should search with the query object if nothing then it will just show everything 
    model.find(query)
    .sort({price: 1}) // we love chaining stuff 
    .then(services => {
        res.render('./blackice/items', { services });
        // console.log(services.sort())
    })
    .catch(err => {
        console.error('Error occurred during model.find():', err);
        next(err);
    });
};

exports.new = (req, res) => {
    res.render('./blackice/new'); 
}


exports.create = (req, res, next) => {
    
    upload(req, res, (err) => {
        if(err){
            err = new Error('File upload failed, please check file size is under 2MB or that it is JPG, SVG, PNG, OR GIF'); 
            err.status = 404;
            return next(err);
        }
        

        const errors = [];

        // https://github.com/validatorjs/validator.js/blob/master/README.md
        // the middlewares were killing me :(  
        req.body.title = validator.escape(req.body.title.trim()); 
        req.body.details = validator.escape(req.body.details.trim());
        console.log(req.body); 

        // console.log(req.body);
        
        if (!req.body.title || req.body.title.trim().length === 0) {
            errors.push('Title cannot be empty.');
        }
        if (!req.body.details || req.body.details.trim().length < 10) {
            errors.push('Details must have a minimum length of 10 characters.');
        }
        
        if (!['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Pro'].includes(req.body.condition)) {
            
            errors.push('Condition is required and must be valid.');

        }
        if (!req.body.price || isNaN(req.body.price) || req.body.price <= 0 || req.body.price > 100) {
            errors.push('Price must be a valid currency amount between 0.01 and 100.');
        }
    
        // let errors = validationResult(req); 
       
        // console.log(errors);
        if (errors.length > 0) {
            errors.forEach(error => {
                console.log(error);
                req.flash('error', error);
            })
            return res.redirect('/items/new');
        }


        let service = new model(req.body); 
        // service.condition = req.body['condition-dropdown'];
        service.seller = req.session.user;
        // console.log(service);



        

        
        // console.log(req.body); 


        


        // console.log(service.condition); 
        // console.log(req.file); 
        if(req.file){
            service.image = `/images/${req.file.filename}`;
        }
        // console.log(service);
        service.save()
        .then(newItem => {
            req.flash('success', "You have successfully created a new item."); 
            res.redirect('/items');
            
        })
        .catch(err => {
            if(err.name === 'ValidationError') {
                console.log(req.session);
                err.status = 400; 
                req.flash('error', err.message);
                return res.redirect('/items/new');
            }
            next(err)}
        );
        
        

    });

};

exports.show = (req, res, next) =>{
    let id = req.params.id;
    model.findById(id).populate('seller', 'firstName lastName')
    .then(service => {
        
        if(service){
            res.render('./blackice/item', {service});
        } else {
            let err = new Error(`Cannot find id: ${id}`); 
            err.status = 404; 
            next(err);
        }
    })
    .catch(err=>next(err));
    

     
}; 

exports.edit = (req, res, next) => {
    let id = req.params.id; 
    
    model.findById(id)
    .then(service  => {
        console.log(service);
        if(service){
           
            return res.render('./blackice/edit', {service});
        } else {
            let err = new Error(`Cannot find id: ${id}`); 
            err.status = 404; 
            next(err);
        }
    })
    .catch(err=>next(err)); 

}

exports.update = (req, res, next) => {
    // let service = req.body;
    let id = req.params.id;


    upload(req, res, (err) => {
        if(err){
            err = new Error('File upload failed. Please check file size is under 2MB or valid file format (JPG, PNG, etc.)');
            err.status = 400;
            return next(err);
        }
        let errors = []; 

        req.body.title = validator.escape(req.body.title.trim()); 
        req.body.details = validator.escape(req.body.details.trim());
        // console.log(req.body); 

        // console.log(req.body);
        
        if (!req.body.title || req.body.title.trim().length === 0) {
            errors.push('Title cannot be empty.');
        }
        if (!req.body.details || req.body.details.trim().length < 10) {
            errors.push('Details must have a minimum length of 10 characters.');
        }
        
        if (!['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Pro'].includes(req.body['condition-dropdown'])) {
            
            errors.push('Condition is required and must be valid.');

        }
        if (!req.body.price || isNaN(req.body.price) || req.body.price <= 0 || req.body.price > 100) {
            errors.push('Price must be a valid currency amount between 0.01 and 100.');
        }
    
        // let errors = validationResult(req); 
        let id = req.params.id;
        // console.log(errors);
        if (errors.length > 0) {
            errors.forEach(error => {
                console.log(error);
                req.flash('error', error);
            })
            return res.redirect('/items/'+id+'/edit');
        }


        let service = req.body;
        
        if(req.file){
            service.image = '/images/' + req.file.filename;
        }
        service.condition = req.body['condition-dropdown'];
        model.findByIdAndUpdate(id, service, {useFindandModify: false, runValidators: true})
        .then(service => {
            if(service){
                req.flash('success', 'You have successfully updated the item.');
                res.redirect('/items/'+id);
            } else {
                let err = new Error(`Cannot find item with id: ${id}`); 
                err.status = 404;
                return next(err)
            }
        })
        .catch(err=>next(err));
        
    });

};

exports.delete = (req, res, next) => {
    let id = req.params.id; 
    let user = req.session.user; 

    model.findById(id)
        .then(service => {
            if (!service) {
                const err = new Error(`Cannot find item with id: ${id}`);
                err.status = 404;
                throw err;  
            }
            //console.log(service)
            return Offer.deleteMany({ item: id });
        })
        .then(() => {
            return model.findByIdAndDelete(id, { useFindAndModify: false });
        })
        .then(() => {
            req.flash('success', 'You have successfully deleted this item and its offers!');
            res.redirect('/items');
        })
        .catch(err => next(err)); 
};
