const express = require('express'); 
const model = require('../models/blackice'); 
const router = express.Router();
// const multer = require('multer');
const {upload} = require('../middleware/fileUpload');

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
    // console.log("here"); 
    let service = new model(req.body); 
    
    
    upload(req, res, (err) => {
        if(err){
            err = new Error('File upload failed, please check file size is under 2MB or that it is JPG, SVG, PNG, OR GIF'); 
            err.status = 404;
            return next(err);
        }
        let service = new model(req.body); 
        if(req.file){
            service.image = `/images/${req.file.filename}`;
        }
        service.save()
        .then(newItem => {
            res.redirect('/items');
        })
        .catch(err => {
            if(err.name === 'ValidationError') {
                err.status = 400; 
            }
            next(err)}
        );
        
        service.condition = req.body['condition-dropdown'];

    });

};

exports.show = (req, res, next) =>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error(`Invalid id format: ${id}`);
        err.status = 400;
        return next(err);
    }
    model.findById(id)
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
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid id format'); 
        err.status = 400;
        return next(err); 
    }
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
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid id format'); 
        err.status = 400;
        return next(err); 
    }


    upload(req, res, (err) => {
        if(err){
            err = new Error('File upload failed. Please check file size is under 2MB or valid file format (JPG, PNG, etc.)');
            err.status = 400;
            return next(err);
        }
        let service = req.body;
        let id = req.params.id;
        if(req.file){
            service.image = '/images/' + req.file.filename;
        }
        service.condition = req.body['condition-dropdown'];
        model.findByIdAndUpdate(id, service, {useFindandModify: false, runValidators: true})
        .then(service => {
            if(service){
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

    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid item id'); 
        err.status = 400;
        return next(err); 
    }

    model.findByIdAndDelete(id, {useFindandModify: false})
    .then(service => {
        if(service){
            res.redirect('/items');
        } else {
            let err = new Error(`Cannot find item with id: ${id}`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));

}; 

