import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Ensure you have this import
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/Login";
import SignUp from "./components/Signup";
import HomePage from "./components/HomePage";
import CreateTrip from "./components/CreateTrip";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <ToastContainer /> {/* Add ToastContainer here */}
                        <Routes>
                            <Route path="/" element={<SignUp />} />
                            <Route path="/home-page" element={isLoggedIn ? <HomePage /> : <Login onLogin={handleLogin} />} />
                            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/create-trip" element={isLoggedIn ? <CreateTrip /> : <Login onLogin={handleLogin} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
