import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import '../styles/Login.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { fname, lname, email, password } = this.state;
        console.log(fname, lname, email, password);
        fetch("http://localhost:5000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accesss-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                fname,
                lname,
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
                                <label>First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    onChange={(e) =>
                                        this.setState({ fname: e.target.value })
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    onChange={(e) =>
                                        this.setState({ lname: e.target.value })
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
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
