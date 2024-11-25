const { model } = require("mongoose");
const Response = require('../utils/response');


// Get Document by Any ID
exports.getDataById = (Model, idField = '_id') => async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from route params
        
        // Create a dynamic query based on the specified idField
        const query = { [idField]: id };
        
        const data = await Model.findOne(query);

        if (!data) {
            return res.status(404).json(Response.error(404, { errCode: 'NOT_FOUND' }, 'Data not found'));
        }

        res.status(200).json(Response.success(200, { data }, 'Data fetched successfully'));

    } catch (error) {
        console.log('error: ', error)
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, 'Failed to fetch data'));
    }
};




// Get All Documents
exports.getAllData = (Model) => async (req, res) => {
    try {
        console.log('Model: ', Model)
        const trips = await Model.find(); // Retrieve all documents
        console.log('data: ', trips)

        res.status(200).json(Response.success(200, { data: trips }, 'Data fetched successfully'));
        
    } catch (error) {
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, 'Failed to fetch data'));
    }
};
