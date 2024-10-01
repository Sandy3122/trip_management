import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./components/Login";
import SignUp from "./components/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<SignUp />} /> {/* Default path */}
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
