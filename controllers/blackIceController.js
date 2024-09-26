const express = require('express'); 
const model = require('../models/blackice'); 
const router = express.Router();
const multer = require('multer');


exports.index = (req, res) => {
    let services = model.find(); 
    res.render('./blackice/items', {services}); 
}; 

exports.new = (req, res) => {
    res.render('./blackice/new'); 
}

const upload = multer({dest: '../public/images'}).single('image'); 

exports.create = (req, res) => {
    let service  = req.body; 
    model.save(service); 
    res.redirect('./blackiceservices');
};

exports.show = (req, res, next) =>{
    let id = req.params.id;
    let service = model.findById(id);
    console.log(service);
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
    console.log(service); 
    let id = req.params.id;
    if (model.updateById(id, service)) {
        // console.log("here"); 
        
        res.redirect('/blackiceservices/'+id);
    } else {
        let err = new Error(`Cannot find id: ${id}`);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id; 
    if(model.deleteById(id)){
        res.redirect('/blackiceservices');
    } else {
        let err = new Error(`Cannot find id: ${id}`);
        err.status = 404;
        next(err);
    }
}; 