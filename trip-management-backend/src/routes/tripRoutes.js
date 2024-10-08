const express = require('express');
const { createTrip } = require('../controllers/tripController');
const router = express.Router();

// Route to create a new trip
router.post('/create', createTrip);

module.exports = router;
