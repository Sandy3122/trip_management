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
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
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
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
            });
    }

    render() {
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
                                    className="form-control"
                                    placeholder="User name"
                                    onChange={(e) =>
                                        this.setState({ userName: e.target.value })
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Phone Number</label>
                                <input
                                    type="phone"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="form-control"
                                    placeholder="Phone number"
                                    onChange={(e) =>
                                        this.setState({ phoneNumber: e.target.value })
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={(e) =>
                                        this.setState({ email: e.target.value })
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={(e) =>
                                        this.setState({ password: e.target.value })
                                    }
                                />
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
