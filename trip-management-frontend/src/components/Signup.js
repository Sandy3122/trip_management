import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import '../styles/Login.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            phoneNumber: "",
            email: "",
            password: "",
            errors:{},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    validate = () => {
        const { userName, phoneNumber, email, password } = this.state;
        const errors = {};
        let isValid = true;

        if (!userName || userName.length < 3) {
            errors.userName = "User name must be at least 3 characters long.";
            isValid = false;
        }
        if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
            errors.phoneNumber = "Phone number is required and must be numeric.";
            isValid = false;
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is required and must be valid.";
            isValid = false;
        }
        if (!password || !/^\d{4}$/.test(password)) {
            errors.password = "Password must be exactly 4 digits.";
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    };

    handleSubmit(e) {
        e.preventDefault();
        if (!this.validate()) return;
        const { userName, phoneNumber, email, password } = this.state;
        console.log(userName, phoneNumber, email, password);
        fetch("http://localhost:5000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accesss-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userName,
                phoneNumber,
                email,
                password,
            }),
        })
            
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                console.log(data, "userRegister");
                // Reset form fields or redirect
                this.setState({ userName: "", phoneNumber: "", email: "", password: "", errors: {} });
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }


    render() {
        const { userName, phoneNumber, email, password, errors } = this.state;
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card shadow-lg p-4">
                        <form onSubmit={this.handleSubmit}>
                            <h3 className="text-center mb-4">Sign Up</h3>

                            <div className="form-group mb-3">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    className={`form-control ${errors.userName ? 'is-invalid' : ''}`}                                    placeholder="User name"
                                    onChange={(e) =>
                                        this.setState({ userName: e.target.value })
                                    }
                                />
                                {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label>Phone Number</label>
                                <input
                                    type="phone"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                    placeholder="Phone number"
                                    onChange={(e) =>
                                        this.setState({ phoneNumber: e.target.value })
                                    }
                                />
                                 {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}                                    placeholder="Enter email"
                                    onChange={(e) =>
                                        this.setState({ email: e.target.value })
                                    }
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}                                    placeholder="Enter 4-digit password"
                                    onChange={(e) =>
                                        this.setState({ password: e.target.value })
                                    }
                                />
                                 {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
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
    }
}
