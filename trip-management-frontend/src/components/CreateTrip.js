import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast

const CreateTrip = () => {
    const [tripDetails, setTripDetails] = useState({
        tripName: '',
        startDate: '',
        endDate: '',
        location: '',
        noOfPersons: 1, // Set default to 1
        currency: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetails({
            ...tripDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Trip Details:', tripDetails);

        // Here you can add code to handle the form submission (e.g., send to server)

        // Show success message
        toast.success("Trip details saved successfully!"); // Show success message
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card" style={{ width: '400px' }}>
                <div className="card-body">
                    <h1 className="card-title text-center">Add Trip Details</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Trip Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="tripName"
                                value={tripDetails.tripName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Row for Start Date and End Date */}
                        <div className="mb-3 row">
                            <div className="col">
                                <label className="form-label">Start Date:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="startDate"
                                    value={tripDetails.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col">
                                <label className="form-label">End Date:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="endDate"
                                    value={tripDetails.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Location:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={tripDetails.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">No Of Persons:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="noOfPersons"
                                value={tripDetails.noOfPersons}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Currency:</label>
                            <select
                                className="form-select"
                                name="currency"
                                value={tripDetails.currency}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Currency</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="JPY">JPY</option>
                                <option value="AUD">AUD</option>
                                {}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Save Trip</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTrip;
