import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import '../styles/Login.css';
import { validateEmail, validateRequired } from '../utils/inputValidation';
import { UserRepository } from '../api/repository';

const Login = ({ onLogin }) => {  // Accept onLogin as a prop
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleValidation = () => {
        const newErrors = {};
        newErrors.email = validateEmail(formData.email);
        newErrors.password = validateRequired(formData.password);
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const response = await UserRepository.loginUser(formData);  // Login logic here
                console.log("response: ", response)
                const { accessToken, refreshToken } = response;
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                onLogin();  // Update login state
                navigate('/home-page');  // Navigate to home page after login
            } catch (error) {
                console.error("Login failed:", error);
            }
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-4">
                <div className="card shadow-lg p-4">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Sign In</h3>

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
                            Sign In
                        </button>

                        <p className="text-center mt-3">
                            Don't have an account? <Link to="/sign-up">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
