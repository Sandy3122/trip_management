// import React, { useState, useRef } from 'react';
// import { toast } from 'react-toastify';
// import { validateRequired } from '../utils/inputValidation';
// import { UserRepository } from "../api/repository";

// const CreateTrip = () => {
//     const [tripDetails, setTripDetails] = useState({
//         tripName: '',
//         startDate: '',
//         endDate: '',
//         location: '',
//         noOfPersons: '',
//         currency: '',
//         tripStatus: 'private',
//     });

//     const [errors, setErrors] = useState({}); // Tracking validation errors
//     const [touched, setTouched] = useState({}); // Tracking touched fields

//     const [suggestions, setSuggestions] = useState([]); // State for place suggestions
//     const inputRef = useRef(); // Ref for the location input

//     const validateField = (name, value) => {
//         let error = '';

//         if (name === 'tripName' && (value.trim().length < 3 || validateRequired(value))) {
//             error = 'Trip name is required and should be at least 3 characters long.';
//         }

//         if (name === 'startDate' && !value) {
//             error = 'Start Date is required.';
//         }

//         if (name === 'endDate' && (!value || new Date(value) <= new Date(tripDetails.startDate))) {
//             error = 'End Date should be after Start Date.';
//         }

//         // Validation for noOfPersons when tripStatus is 'private' and value is empty
//         if (name === 'noOfPersons' && tripDetails.tripStatus === 'private') {
//             if (!value.trim()) {
//                 error = 'Number of persons is required for private trips.';
//             }
//         }

//         // Validate the location dropdown
//         if (name === 'location' && validateRequired(value)) {
//             error = 'Location is required.';
//         }

//         if (name === 'currency' && validateRequired(value)) {
//             error = 'Currency is required.';
//         }

//         setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//     };

//     const handleBlur = (e) => {
//         const { name, value } = e.target;
//         setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
//         validateField(name, value);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTripDetails({
//             ...tripDetails,
//             [name]: value,
//         });

//         if (name === 'location') {
//             fetchSuggestions(value);
//         }

//         validateField(name, value);
//     };

//     const fetchSuggestions = async (input) => {
//         if (input.length < 2) {
//             setSuggestions([]);
//             return;
//         }

//         try {
//             const response = await UserRepository.getPlaces(input);
            
//             setSuggestions(response);
//         } catch (error) {
//             toast.error("Error fetching suggestions. Please try again later.");
//             setSuggestions([]);
//         }
//     };

//     const handleSelectSuggestion = (description) => {
//         setTripDetails({
//             ...tripDetails,
//             location: description,
//         });
//         setSuggestions([]);
//     };

//     const handleStatusToggle = () => {
//         setTripDetails({
//             ...tripDetails,
//             tripStatus: tripDetails.tripStatus === 'private' ? 'public' : 'private' // Toggle between 'private' and 'public'
//         });
//     };

//     const validateForm = () => {
//         const fields = ['tripName', 'startDate', 'endDate', 'location', 'noOfPersons', 'currency'];
//         let isValid = true;

//         fields.forEach((field) => {
//             if (!tripDetails[field] || errors[field]) {
//                 validateField(field, tripDetails[field]);
//                 isValid = false;
//             }
//         });

//         return isValid;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             toast.error('Please correct the errors before submitting.');
//             return;
//         }

//         console.log('Trip Details:', tripDetails);
//         toast.success("Trip details saved successfully!");

//         setTripDetails({
//             tripName: '',
//             startDate: '',
//             endDate: '',
//             location: '',
//             noOfPersons: '',
//             currency: '',
//             tripStatus: 'private',
//         });
//         setErrors({});
//         setTouched({});
//     };

//     const inputClass = (name) => {
//         return touched[name] && errors[name]
//             ? 'form-control is-invalid'
//             : touched[name] && !errors[name]
//             ? 'form-control is-valid'
//             : 'form-control';
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
//             <div className="card shadow-lg m-2 col-sm-10 col-md-8 col-lg-5" style={{ borderRadius: '15px' }}>
//                 <div className="card-body p-4">
//                     <h1 className="card-title text-center mb-4">Add Trip Details</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3 row align-items-center">
//                             <label className="form-label col-sm-4">Trip Status:</label>
//                             <div className="col-sm-8">
//                                 <div className="form-check form-switch">
//                                     <input
//                                         type="checkbox"
//                                         className="form-check-input"
//                                         role="switch"
//                                         id="tripStatus"
//                                         checked={tripDetails.tripStatus === 'public'}
//                                         onChange={handleStatusToggle}
//                                     />
//                                     <label className="form-check-label" htmlFor="tripStatus">
//                                         {tripDetails.tripStatus === 'public' ? 'Public' : 'Private'}
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">Trip Name:</label>
//                             <input
//                                 type="text"
//                                 className={inputClass('tripName')}
//                                 id="tripName"
//                                 name="tripName"
//                                 value={tripDetails.tripName}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required
//                                 placeholder="Enter trip name"
//                             />
//                             {errors.tripName && <div className="invalid-feedback">{errors.tripName}</div>}
//                         </div>

//                         <div className="mb-3 row">
//                             <div className="col">
//                                 <label className="form-label">Start Date:</label>
//                                 <input
//                                     type="date"
//                                     className={inputClass('startDate')}
//                                     id="startDate"
//                                     name="startDate"
//                                     value={tripDetails.startDate}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     required
//                                 />
//                                 {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
//                             </div>
//                             <div className="col">
//                                 <label className="form-label">End Date:</label>
//                                 <input
//                                     type="date"
//                                     className={inputClass('endDate')}
//                                     id="endDate"
//                                     name="endDate"
//                                     value={tripDetails.endDate}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     required
//                                 />
//                                 {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
//                             </div>
//                         </div>

                        // <div className="mb-3 position-relative">
                        //     <label className="form-label">Location:</label>
                        //     <input
                        //         type="text"
                        //         className={inputClass('location')}
                        //         id="location"
                        //         name="location"
                        //         value={tripDetails.location}
                        //         onChange={handleChange}
                        //         onBlur={handleBlur}
                        //         required
                        //         placeholder="Enter location"
                        //         ref={inputRef}
                        //     />
                        //     {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                        //     {suggestions.length > 0 && (
                        //         <ul className="list-group mt-2 position-absolute" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                        //             {suggestions.map((suggestion, index) => (
                        //                 <li
                        //                     key={index}
                        //                     className="list-group-item list-group-item-action"
                        //                     onClick={() => handleSelectSuggestion(suggestion)}
                        //                 >
                        //                     {suggestion}
                        //                 </li>
                        //             ))}
                        //         </ul>
                        //     )}
                        // </div>

//                         <div className="mb-3">
//                             <label className="form-label">Number of Persons:</label>
//                             <input
//                                 type="number"
//                                 className={inputClass('noOfPersons')}
//                                 id="noOfPersons"
//                                 name="noOfPersons"
//                                 value={tripDetails.noOfPersons}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 placeholder="Enter number of persons"
//                                 required={tripDetails.tripStatus === 'private'} // Only required for private trips
//                             />
//                             {errors.noOfPersons && <div className="invalid-feedback">{errors.noOfPersons}</div>}
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">Currency:</label>
//                             <select
//                                 className={inputClass('currency')}
//                                 id="currency"
//                                 name="currency"
//                                 value={tripDetails.currency}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required
//                             >
//                                 <option value="" disabled>Select currency</option> {/* Placeholder option */}
//                                 <option value="INR">₹ INR</option>
//                                 <option value="Euro">€ Euro</option>
//                                 <option value="Dollar">$ Dollar</option>
//                                 <option value="Pound">£ Pound</option>
//                             </select>
//                             {errors.currency && <div className="invalid-feedback">{errors.currency}</div>}
//                         </div>


//                         <button type="submit" className="btn btn-primary w-100">Submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateTrip;



































import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { validateRequired } from '../utils/inputValidation';
import { UserRepository } from "../api/repository";
import FormInput from '../components/common/FormInput';
import CardLayout from '../components/common/CardLayout';

const CreateTrip = () => {
    const [tripDetails, setTripDetails] = useState({
        tripName: '',
        startDate: '',
        endDate: '',
        location: '',
        noOfPersons: '',
        currency: '',
        tripStatus: 'private',
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [suggestions, setSuggestions] = useState([]);
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
        if (name === 'noOfPersons' && tripDetails.tripStatus === 'private') {
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
    
        // Check noOfPersons only if tripStatus is private
        if (tripDetails.tripStatus === 'private') {
            validateField('noOfPersons', tripDetails.noOfPersons);
            if (errors.noOfPersons) {
                isValid = false;
            }
        }
    
        return isValid;
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please correct the errors before submitting.');
            return;
        }
        console.log('Trip Details:', tripDetails);
        toast.success("Trip details saved successfully!");

        setTripDetails({
            tripName: '',
            startDate: '',
            endDate: '',
            location: '',
            noOfPersons: '',
            currency: '',
            tripStatus: 'private',
        });
        setErrors({});
        setTouched({});
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
                    name="noOfPersons"
                    label="Number of Persons"
                    value={tripDetails.noOfPersons}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.noOfPersons}
                    error={errors.noOfPersons}
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