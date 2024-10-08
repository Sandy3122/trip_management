const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


// Secret keys for signing the tokens
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '15m';  // JWT expiration time
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRES_IN = '7d';  // Refresh token expiration time

// Generate access (JWT) token
exports.generateAccessToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Generate refresh token
exports.generateRefreshToken = (user) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};

// Verify access token
exports.verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

// Verify refresh token
exports.verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
};
