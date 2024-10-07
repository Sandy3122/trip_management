const express = require('express');
const { GoogleMapPlaces } = require('../controllers/googleMapPlaces');
const router = express.Router();

router.get('/places', GoogleMapPlaces);

module.exports = router;
