const express = require('express');
const router = express.Router();
const tripController = require('../controllers/dynamicController');
const Trip = require('../models/tripModel');
const User = require('../models/userModel');

// Get Trip by ID
// router.get('/trip/:id', tripController.getDataById(Trip, 'tripId')); // Use tripId as the identifier
router.get('/trip/:id', tripController.getDataById(Trip)); // By default it will data with _id


// Get all Trips
router.get('/trips', tripController.getAllData(Trip));

// Get User by ID
router.get('/user/:id', tripController.getDataById(User, 'userId')); // Use userId as the identifier

// Get all Users
router.get('/users', tripController.getAllData(User));

module.exports = router;
