const Response = require('../utils/response');
const fetch = require('node-fetch');

exports.GoogleMapPlaces = async (req, res) => {
    const { input } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Replace with your actual API key
    const url = process.env.GOOGLE_ACCESS_URL + `?input=${input}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const places = data.predictions?.slice(0, 3).map(prediction => {
            return prediction.terms
                .map(term => term.value)
                .join(', '); 
        }) || [];

        console.log('res: ', places);
        res.json(Response.success(200, places, 'Fetched places successfully'));
    } catch (error) {
        console.error('Error fetching from Google API:', error);
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, 'Failed to fetch data from Google API'));
    }
};