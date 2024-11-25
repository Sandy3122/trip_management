const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const rateLimit = require('express-rate-limit');
const authenticateJWT = require('./src/middlewares/authMiddleware'); // Assuming you have an authentication middleware
const authRoutes = require('./src/routes/authRoutes');  // Import the auth routes


// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true }));

const userRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: 'Too many requests from this IP, please try again later.'
});


// Middleware
app.use(cors())

// Routes
app.use('/auth', authRoutes);   // Refresh Token
app.use('/api/users', userRateLimiter, require('./src/routes/userRoutes'));
app.use('/api/autocomplete', require('./src/routes/googleMapsAPI'))
app.use('/api/trip', authenticateJWT, require('./src/routes/tripRoutes'))

app.use('/', require('./src/routes/dynamicRoutes'))


// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});


// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
