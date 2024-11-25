const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define Trip Schema
const tripSchema = new mongoose.Schema({
    tripStatus: {
        type: String,
        required: true,
        enum: ['private', 'public'],
    },
    tripName: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    maxMembers: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    // membersJoined: [
    //     {
    //         userId: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'User',
    //             required: true,
    //         },
    //         _id: false,
    //     },
    // ],
    membersJoined: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    tripId: {
        type: String,
        default: uuidv4, // Generates a unique tripId
    },
    shareCode: {
        type: String,
        default: function () {
            return Math.random().toString(36).substr(2, 6).toUpperCase();  // Random share code
        },
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the Trip model
module.exports = mongoose.model('Trip', tripSchema);
