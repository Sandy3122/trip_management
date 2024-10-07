import React, { useState } from 'react';
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
    // Check if the user is logged in by checking localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

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
                            <Route path="/" element={<PublicRoute isAuthenticated={isLoggedIn} Component={SignUp} />} />
                            {/* Pass Login component correctly with props */}
                            <Route path="/sign-in" element={<PublicRoute isAuthenticated={isLoggedIn} Component={() => <Login onLogin={handleLogin} />} />} />
                            <Route path="/sign-up" element={<PublicRoute isAuthenticated={isLoggedIn} Component={SignUp} />} />
                            <Route path="/home-page" element={<PrivateRoute isAuthenticated={isLoggedIn} Component={HomePage} />} />
                            <Route path="/create-trip" element={<PrivateRoute isAuthenticated={isLoggedIn} Component={CreateTrip} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
