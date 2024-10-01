import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import '../styles/Login.css'

export default class Login extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card shadow-lg p-4">
                        <form>
                            <h3 className="text-center mb-4">Sign In</h3>

                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                />
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
