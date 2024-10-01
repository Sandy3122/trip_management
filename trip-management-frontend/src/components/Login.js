import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import '../styles/Login.css'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this); 
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, errors: {} }); // Clear errors on change
    }
    validate = () => {
        const { email, password } = this.state;
        const errors = {};
        let isValid = true;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is required and must be valid.";
            isValid = false;
        }
        if (!password) {
            errors.password = "Password is required.";
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.validate()) return;

        const { email, password } = this.state;
        console.log("Submitted: ", { email, password });
        
    }
    render() {
        const { email, password, errors } = this.state;
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card shadow-lg p-4">
                        <form onSubmit={this.handleSubmit}> 
                            <h3 className="text-center mb-4">Sign In</h3>

                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    onChange={this.handleChange}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}                                  
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    onChange={this.handleChange}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}                                    
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className="form-group form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customCheck1"
                                >
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Submit
                            </button>

                            <p className="text-center mt-3">
                                Don't have an account? <Link to="/sign-up">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
