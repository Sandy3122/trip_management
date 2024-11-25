const Trip = require('../models/tripModel');
const Response = require('../utils/response');

// Create a New Trip
exports.createTrip = async (req, res) => {
    try {
        const {
            tripStatus,
            tripName,
            startDate,
            endDate,
            location,
            maxMembers,
            currency,
        } = req.body;

        const userId = req.user.id; // Assuming user is authenticated and req.user contains user info

        // Create the trip document
        const newTrip = new Trip({
            tripStatus,
            tripName,
            startDate,
            endDate,
            location,
            maxMembers,
            currency,
            membersJoined: [ userId ],  // Adding the user who created the trip
        });

        // Save the trip in the database
        await newTrip.save();

        res.status(200).json(Response.success(201, { 
            data: newTrip
        }, 'Trips created successfully'));

    } catch (error) {
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, error.message));
    }
};


// Get all Trips
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find(); // Retrieve all trips from the database
        res.status(200).json(Response.success(200, { 
            data: trips
        }, 'Trips fetched successfully'));
    } catch (error) {
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, error.message));
    }
};



// Get Trip by ID
exports.getTripById = async (req, res) => {
    try {
        const { tripId } = req.params;
        const trip = await Trip.findOne({ tripId }); // Find the trip by tripId

        if (!trip) {
            return res.status(404).json(Response.error(404, { errCode: 'TRIP_NOT_FOUND' }, 'Trip not found'));
        }

        res.status(200).json(Response.success(200, { 
            data: trip
        }, 'Trips fetched successfully'));

    } catch (error) {
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, 'Failed to fetch trip'));
    }
};


// Join a Trip using shareCode
exports.joinTrip = async (req, res) => {
    try {
        const { shareCode } = req.body;  // Assuming the user passes the shareCode in the request body
        const userId = req.user.id; // Assuming req.user contains authenticated user information

        if (!userId) {
            return res.status(404).json(Response.error(404, { errCode: 'USER_NOT_FOUND' }, 'User not found'));
        }

        // Find the trip by shareCode
        const trip = await Trip.findOne({ shareCode });
            
        if (!trip) {
            return res.status(404).json(Response.error(404, { errCode: 'TRIP_NOT_FOUND' }, 'Trip not found'));
        }

        // Check if the user is already part of the trip
        const isUserAlreadyJoined = trip.membersJoined.includes(userId);

        if (isUserAlreadyJoined) {
            return res.status(400).json(Response.error(400, { errCode: 'ALREADY_JOINED' }, 'User has already joined this trip'));
        }

        // Check if the trip has space for more members
        if (trip.membersJoined.length >= trip.maxMembers) {
            return res.status(400).json(Response.error(400, { errCode: 'TRIP_FULL' }, 'Trip is already full'));
        }

        // Add the user to the trip's membersJoined array
        trip.membersJoined.push( userId );
        await trip.save();

        res.status(200).json(Response.success(200, { 
            data: trip
        }, 'User joined the trip successfully'));
        
    } catch (error) {
        console.log('error: ', error)
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, 'Failed to join trip'));
    }
};