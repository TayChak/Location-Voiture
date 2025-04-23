const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/createReservation',reservationController.createReservation);
router.get('/getAllReservations',reservationController.getAllReservations);
router.get('/getReservationById:id',reservationController.getReservationById);
router.put('/updateReservation:id',reservationController.updateReservation);
router.delete('/deleteReservation:id',reservationController.deleteReservation);
module.exports = router;
