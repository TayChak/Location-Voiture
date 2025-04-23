var express = require('express');
var router = express.Router();
const upload = require('../middlewares/uploadFile');
const carController = require('../controllers/carController');

// Routes
router.get('/getAllCars', carController.getAllCars);
router.get('/getCarById/:id', carController.getCarById);
router.post('/addCar', upload.single('voiture_image'), carController.addCar); 
router.put('/updateCar/:id', carController.updateCar);
router.delete('/deleteCarById/:id', carController.deleteCarById);

module.exports = router;
