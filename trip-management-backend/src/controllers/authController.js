const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtUtils');
const sessionStore = require('../utils/sessionStore');
const Response = require('../utils/response');

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json(Response.error(403, null, 'Refresh token required'));
    }

    // Validate refresh token in session store
    if (!sessionStore.validateData(refreshToken)) {
        return res.status(403).json(Response.error(403, null, 'Invalid or expired refresh token'));
    }

    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
        return res.status(403).json(Response.error(403, null, 'Invalid or expired refresh token'));
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email });

    // Return the new access token
    res.status(200).json(Response.success(200, { accessToken: newAccessToken }, 'New access token issued successfully'));
};
