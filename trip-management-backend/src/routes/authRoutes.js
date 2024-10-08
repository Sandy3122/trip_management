const express = require('express');
const jwtUtils = require('../utils/jwtUtils');
const Response = require('../utils/response');
const router = express.Router();

// Route to refresh the access token
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Step 1: Validate if the refresh token exists
    if (!refreshToken) {
      return res.status(400).json(Response.error(400, null, 'Refresh token is required'));
    }

    // Step 2: Verify the refresh token using the refresh token secret
    const decoded = jwtUtils.verifyRefreshToken(refreshToken);

    // Step 3: If the refresh token is invalid or expired, return an error
    if (!decoded) {
      return res.status(403).json(Response.error(403, null, 'Invalid or expired refresh token'));
    }

    // Step 4: If the refresh token is valid, generate a new access token
    const newAccessToken = jwtUtils.generateAccessToken({ id: decoded.id, email: decoded.email });


    // Step 5: Send the new access token to the client
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(500).json(Response.error(500, null, 'Internal Server Error'));
  }
});

module.exports = router;
