const express = require('express');
const { createTrip, getAllTrips, getTripById, joinTrip } = require('../controllers/tripController');
const router = express.Router();

// Route to create a new trip
router.post('/create', createTrip);

// Route to get all trips
router.get('/all', getAllTrips);

// Route to get a trip by ID
router.get('/:tripId', getTripById);        

// Route to join a trip using the shareCode
router.post('/join', joinTrip);

module.exports = router;