let sessionStore = {};  // Replace with Redis or DB in production

// Store key-value pair (e.g., token, user ID, etc.)
exports.storeData = (key, value) => {
    sessionStore[key] = value;
};

// Remove key-value pair
exports.removeData = (key) => {
    delete sessionStore[key];
};

// Validate if key exists
exports.validateData = (key) => {
    return sessionStore.hasOwnProperty(key);
};

// Retrieve data based on key
exports.getData = (key) => {
    return sessionStore[key];
};