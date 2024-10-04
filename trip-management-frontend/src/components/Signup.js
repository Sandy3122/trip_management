import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css';
import { 
    validateEmail, 
    validatePhoneNumber, 
    validateOnlyNumbers, 
    validatePassword, 
    validateRequired 
} from  '../utils/inputValidation';

import { UserRepository } from "../api/repository";


const SignUp = () => {
    const navigate = useNavigate(); // Use useNavigate for React Router v6
    const [formData, setFormData] = useState({
        userName: "",
        phoneNumber: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleValidation = () => {
        const newErrors = {};

        // Add dynamic validation for each field
        newErrors.userName = validateRequired(formData.userName);
        newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber) || validateOnlyNumbers(formData.phoneNumber);
        newErrors.email = validateEmail(formData.email);
        newErrors.password = validatePassword(formData.password);

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    };

    const resetFormData = () => {
        setFormData({
            userName: "",
            phoneNumber: "",
            email: "",
            password: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formdata1: ', formData)
        if (handleValidation()) {
          try {
            console.log('formdata2: ', formData)
            const response = await UserRepository.registerUser(formData); // Calls the repository function
            // Reset form data
            resetFormData();
            // Redirect to the login page
            navigate('/sign-in');
            console.log(response, "userRegister");
          } catch (error) {
            console.error("Registration failed:", error);
          }
        } else {
          console.log("Validation failed");
        }
      };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-4">
                <div className="card shadow-lg p-4">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Sign Up</h3>

                        <div className="form-group mb-3">
                            <label>User Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                className="form-control"
                                placeholder="User name"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                            {errors.userName && <span className="text-danger">{errors.userName}</span>}
                        </div>

                        <div className="form-group mb-3">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control"
                                placeholder="Phone number"
                                maxLength={10}
                                value={formData.phoneNumber}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    // Update state only if the value is numeric
                                    if (/^[0-9]*$/.test(value)) {
                                        handleChange(e);
                                    }
                                }}
                                pattern="[0-9]*" // Optional: adds validation in some browsers
                            />
                            {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                        </div>



                        <div className="form-group mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>

                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Sign Up
                        </button>

                        <p className="text-center mt-3">
                            Already registered? <Link to="/sign-in">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
