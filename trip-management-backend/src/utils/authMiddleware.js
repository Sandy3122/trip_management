const jwtUtils = require('../utils/jwtUtils');
const Response = require('../utils/response');

// Middleware to verify JWT token for protected routes
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json(Response.error(401, null, 'Access token required'));
    }

    const accessToken = token.split(' ')[1];
    const decoded = jwtUtils.verifyAccessToken(accessToken);

    if (!decoded) {
        return res.status(403).json(Response.error(403, null, 'Invalid or expired access token'));
    }

    req.user = decoded;  // Store user info in the request object
    next();
};

module.exports = authenticateJWT;
