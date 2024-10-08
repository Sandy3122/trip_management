import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { validateRequired } from '../utils/inputValidation';
import { UserRepository } from "../api/repository";
import FormInput from '../components/common/FormInput';
import CardLayout from '../components/common/CardLayout';
import { TripRepository } from "../api/tripRepository";
import { useNavigate } from "react-router-dom";



const CreateTrip = () => {
    const [tripDetails, setTripDetails] = useState({
        tripName: '',
        startDate: '',
        endDate: '',
        location: '',
        maxMembers: '',
        currency: '',
        tripStatus: 'private',
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef();

    const validateField = (name, value) => {
        let error = '';
        if (name === 'tripName' && (value.trim().length < 3 || validateRequired(value))) {
            error = 'Trip name is required and should be at least 3 characters long.';
        }
        if (name === 'startDate' && !value) {
            error = 'Start Date is required.';
        }
        if (name === 'endDate' && (!value || new Date(value) <= new Date(tripDetails.startDate))) {
            error = 'End Date should be after Start Date.';
        }
        if (name === 'maxMembers' && tripDetails.tripStatus === 'private') {
            if (!value.trim()) {
                error = 'Number of persons is required for private trips.';
            }
        }
        if (name === 'location' && validateRequired(value)) {
            error = 'Location is required.';
        }
        if (name === 'currency' && validateRequired(value)) {
            error = 'Currency is required.';
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
        validateField(name, value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetails({
            ...tripDetails,
            [name]: value,
        });
        
        // Validate the field after changing the value
        validateField(name, value);
    
        // If location is changed, fetch suggestions
        if (name === 'location') {
            fetchSuggestions(value);
        }
    };
    

    const fetchSuggestions = async (input) => {
        if (input.length < 2) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await UserRepository.getPlaces(input);
            setSuggestions(response);
        } catch (error) {
            toast.error("Error fetching suggestions. Please try again later.");
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (description) => {
        setTripDetails({
            ...tripDetails,
            location: description,
        });
        setSuggestions([]);
    };

    const handleStatusToggle = () => {
        setTripDetails({
            ...tripDetails,
            tripStatus: tripDetails.tripStatus === 'private' ? 'public' : 'private'
        });
    };

    const validateForm = () => {
        const fields = ['tripName', 'startDate', 'endDate', 'location', 'currency'];
        let isValid = true;
    
        // Always validate required fields
        fields.forEach((field) => {
            validateField(field, tripDetails[field]);
            if (!tripDetails[field] || errors[field]) {
                isValid = false;
            }
        });
    
        // Check maxMembers only if tripStatus is private
        if (tripDetails.tripStatus === 'private') {
            validateField('maxMembers', tripDetails.maxMembers);
            if (errors.maxMembers) {
                isValid = false;
            }
        }
    
        return isValid;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please correct the errors before submitting.');
            return;
        }
        
        try {
            const response = await TripRepository.createTrip(tripDetails)

            toast.success("Trip created successfully!");
            console.log('Response:', response.data);
    
            // Reset the form
            setTripDetails({
                tripName: '',
                startDate: '',
                endDate: '',
                location: '',
                maxMembers: '',
                currency: '',
                tripStatus: 'private',
            });
            setErrors({});
            setTouched({});
            // Redirect to the login page
            navigate('/home-page');
        } catch (error) {
            toast.error("Failed to create trip. Please try again later.");
            console.error('Error:', error);
        }
    };
    

    return (
        <CardLayout>
            <h1 className="card-title text-center mb-4">Add Trip Details</h1>
            <form onSubmit={handleSubmit}>
               
                <div className="mb-3 row align-items-center">
                    <label className="form-label col-sm-4">Trip Status:</label>
                    <div className="col-sm-8">
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                role="switch"
                                id="tripStatus"
                                checked={tripDetails.tripStatus === 'public'}
                                onChange={handleStatusToggle}
                            />
                            <label className="form-check-label" htmlFor="tripStatus">
                                {tripDetails.tripStatus === 'public' ? 'Public' : 'Private'}
                            </label>
                        </div>
                    </div>
                </div>
                <FormInput
                    type="text"
                    name="tripName"
                    label="Trip Name"
                    value={tripDetails.tripName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.tripName}
                    error={errors.tripName}
                    placeholder="Enter trip name"
                    required
                />
                <div className="row">
                    <div className="col">
                        <FormInput
                            type="date"
                            name="startDate"
                            label="Start Date"
                            value={tripDetails.startDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.startDate}
                            error={errors.startDate}
                            required
                        />
                    </div>
                    <div className="col">
                        <FormInput
                            type="date"
                            name="endDate"
                            label="End Date"
                            value={tripDetails.endDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.endDate}
                            error={errors.endDate}
                            required
                        />
                    </div>
                </div>
                <FormInput
                    type="text"
                    name="location"
                    label="Location"
                    value={tripDetails.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.location}
                    error={errors.location}
                    placeholder="Enter location"
                    ref={inputRef}
                    required
                    noMargin={suggestions.length > 0}
                    style={{ marginBottom: suggestions.length > 0 ? 0 : 'mb-3' }}
                />
                {suggestions.length > 0 && (
                    <ul className="list-group position-absolute" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="list-group-item list-group-item-action"
                                onClick={() => handleSelectSuggestion(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
                <FormInput
                    type="number"
                    name="maxMembers"
                    label="Number of Persons"
                    value={tripDetails.maxMembers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.maxMembers}
                    error={errors.maxMembers}
                    placeholder="Enter number of persons"
                    required={tripDetails.tripStatus === 'private'}
                />
                <FormInput 
                    type="select" 
                    name="currency" 
                    label="Currency" 
                    value={tripDetails.currency} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    touched={touched.currency} 
                    error={errors.currency} 
                    placeholder="Select a currency" 
                    options={[ { value: 'USD', label: 'USD' }, { value: 'EUR', label: 'EUR' }, { value: 'INR', label: 'INR' }, ]} 
                    required 
                /> 
                <button type="submit" className="btn btn-primary btn-block mt-3"> Save Trip </button> 
            </form> 
        </CardLayout> 
    );
};

export default CreateTrip;