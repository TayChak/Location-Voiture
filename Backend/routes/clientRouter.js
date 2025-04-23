var express = require('express');
var router = express.Router();
const clientController = require('../controllers/clientController');

// Routes
router.get('/getAllClients',clientController.getAllClient);
router.get('/getClientById/:id', clientController.getclientById);
router.post('/addClient',clientController.addaclient); 
router.put('/updateClient/:id',clientController.updateClient);
router.delete('/deleteClientById/:id',clientController.deleteClientById);

module.exports = router;
