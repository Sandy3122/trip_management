const Trip = require('../models/tripModel');

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
            membersJoined: [{ userId }],  // Adding the user who created the trip
        });

        // Save the trip in the database
        await newTrip.save();

        res.status(201).json({
            message: 'Trip created successfully',
            trip: newTrip,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error. Failed to create trip',
            error: error.message,
        });
    }
};