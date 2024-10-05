import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import

const HomePage = () => {
    const navigate = useNavigate();

    const handleCreateTrip = () => {
        navigate('/create-trip');
    };

    const handleJoinTrip = () => {
        navigate('/join-trip');
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={styles.container}>
            <div className="text-center">
                <h1>Welcome to Trip Manager</h1>
                <div className="mt-4">
                    <button className="btn btn-primary me-2" onClick={handleCreateTrip}>
                        Create Trip
                    </button>
                    <button className="btn btn-secondary" onClick={handleJoinTrip}>
                        Join Trip
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
};

export default HomePage;
