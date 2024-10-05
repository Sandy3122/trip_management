import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/Login";
import SignUp from "./components/Signup";
import HomePage from "./components/HomePage";
import CreateTrip from "./components/CreateTrip";
import PrivateRoute from './routes/PrivateRoute';  
import PublicRoute from './routes/PublicRoute';    

function App() {
    // Check if the user is logged in by checking local storage
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token); // Set logged in state based on token presence
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <ToastContainer /> 
                        <Routes>
                            <Route path="/" element={<PublicRoute isAuthenticated={isLoggedIn} component={SignUp} />} />
                            <Route path="/sign-in" element={<PublicRoute isAuthenticated={isLoggedIn} component={<Login onLogin={handleLogin} />} />} />
                            <Route path="/sign-up" element={<PublicRoute isAuthenticated={isLoggedIn} component={SignUp} />} />
                            <Route path="/home-page" element={<PrivateRoute isAuthenticated={isLoggedIn} component={HomePage} />} />
                            <Route path="/create-trip" element={<PrivateRoute isAuthenticated={isLoggedIn} component={CreateTrip} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
