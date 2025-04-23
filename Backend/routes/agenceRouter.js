const express = require('express');
const router = express.Router();
const agenceController = require('../controllers/agenceController');

// Routes
router.get('/getAllAgences', agenceController.getAllAgences);
router.get('/getAgenceById/:id', agenceController.getAgenceById);
router.post('/addagence', agenceController.addagence); 
router.post('/affect', agenceController.affect);
router.put('/updateAgence/:id', agenceController.updateAgence);
router.delete('/deleteAgenceById/:id', agenceController.deleteAgenceById);

module.exports = router;
