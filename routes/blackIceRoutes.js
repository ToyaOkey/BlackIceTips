const express = require('express'); 
const controller = require('../controllers/blackIceController');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '../public/images'}).single('image'); 


// GET /items :show all services offered
router.get('/', controller.index); 

// GET /items/new : leads to form to add a service 
router.get('/new', controller.new);

// POST /items create a new service 

router.post('/', controller.create);
// router.post('/', controller.create, upload);

// //  /search an existing item

// GET /items/:id : show details of a single service
router.get('/:id', controller.show); 

// GET /items/:id/edit : leads to form to edit an exisiting service 
router.get('/:id/edit', controller.edit); 

// PUT /items/:id update an existing service 

router.put('/:id', controller.update);

// DELETE /items/:id delete an existing service 
router.delete('/:id', controller.delete);





module.exports = router; 


