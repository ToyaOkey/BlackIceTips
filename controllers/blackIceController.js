const express = require('express'); 
const model = require('../models/blackice'); 
const router = express.Router();
const multer = require('multer');
const {v4: uuidv4} = require('uuid'); 
const {upload} = require('../middleware/fileUpload');

exports.index = (req, res) => {

    let services = model.find(); 
    // console.log(req.query.query);
    if(req.query.query !== undefined){
        services = model.search(req.query.query);
        // console.log(services);
    } 
    res.render('./blackice/items', {services}); 
}; 

exports.new = (req, res) => {
    res.render('./blackice/new'); 
}


exports.create = (req, res, next) => {
    // console.log("here"); 
    
    upload(req, res, (err) => {
        if(err){
            res.status(400);
        }
        let service = req.body; 
        
        service.id = uuidv4(); 
        service.offers = 0; 
        console.log(req.file); 
        if (req.file !== undefined){
            service.image = `/images/${req.file.filename}`;
            service.condition = req.body['condition-dropdown'];
            model.save(service);
            res.redirect('./items');

            // do same for the update 
        } else {
            // res.redirect('./items');
            err = new Error('File upload failed, please check file size is under 2MB or that it is JPG, SVG, PNG, OR GIF'); 
            err.status = 404;
            next(err);
        }

    });
    // let service  = req.body; 
    // model.save(service); 
    // res.redirect('./items');
};

exports.show = (req, res, next) =>{
    let id = req.params.id;
    let service = model.findById(id);
    // console.log(service);
    if(service !== undefined) {
        res.render('./blackice/item', {service});
        // console.log("debugging");
    } else {
        let err = new Error(`Cannot find id: ${id}`); 
        err.status = 404; 
        next(err);
    }
     
}; 

exports.edit = (req, res, next) => {
    let id = req.params.id; 
    let service = model.findById(id);
    if(service !== undefined) {
        
        res.render('./blackice/edit', {service});
    } else {
        let err = new Error(`Cannot find id: ${id}`); 
        err.status = 404; 
        next(err);
    }
}

exports.update = (req, res, next) => {
    let service = req.body;

    upload(req, res, (err) => {
        if(err){
            res.status(400);
        }
        let service = req.body;
        let id = req.params.id;
        // console.log(service);
        // console.log(service.image);
        if(req.file !== undefined){
            service.image = '/images/' + req.file.filename; 
            if (model.updateById(id, service)) {
                res.redirect('/items/'+id);
            } else {
                let err = new Error(`Cannot find id: ${id}`);
                err.status = 404;
                next(err);
            }

        } else {
            err = new Error('File upload failed, please check file size is under 2MB or that it is JPG, SVG, PNG, OR GIF')
            err.status = 404;
            next(err);
        }
        

        
    });

};

exports.delete = (req, res, next) => {
    let id = req.params.id; 
    if(model.deleteById(id)){
        res.redirect('/items');
    } else {
        let err = new Error(`Cannot find id: ${id}`);
        err.status = 404;
        next(err);
    }
}; 

