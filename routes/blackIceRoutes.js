const express = require('express'); 
const controller = require('../controllers/blackIceController');
const router = express.Router();


// GET /blackiceservices :show all services offered
router.get('/', controller.index); 

// GET /blackiceservices/new : leads to form to add a service 
router.get('/new', controller.new);

// POST /blackiceservices create a new service 

router.post('/', controller.create);

// GET /blackiceservices/:id : show details of a single service
router.get('/:id', controller.show); 

// GET /blackiceservices/:id/edit : leads to form to edit an exisiting service 
router.get('/:id/edit', controller.edit); 

// PUT /blackiceservices/:id update an existing service 

router.put('/:id', controller.update);

// DELETE /blackiceservices/:id delete an existing service 
router.delete('/:id', controller.delete);

module.exports = router; 


