const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true }));


// Middleware
app.use(cors())

// Routes
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/autocomplete', require('./src/routes/googleMapsAPI'))

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
