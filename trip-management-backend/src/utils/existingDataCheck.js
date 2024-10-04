const User = require('../models/userModel');

// Define the existing data check object
const existingDataCheck = {
    checkExistingUser: async (field, value) => {
        const existingUser = await User.findOne({ [field]: value });
        if (existingUser) {
            return { 
                exists: true, 
                errorCode: `USER_EXISTS_${field.toUpperCase()}`,  // Generate error code dynamically
                message: `User already exists with this ${field}: ${value}` 
            };
        }
        return { exists: false };
    }
};

// Export the object for use in other modules
module.exports = existingDataCheck;
