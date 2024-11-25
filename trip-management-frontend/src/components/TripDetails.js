import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TripDetails = () => {
    const navigate = useNavigate();

    const trips = [
        {
            id: 1,
            tripName: "Goa",
            startDate: "Nov 25, 2024",
            endDate: "Nov 30, 2024",
            totalRupees: "₹50,000",
            image: require('../assets/images/tripPage4.png'),
        },
        {
            id: 2,
            tripName: "Mountain Escape",
            startDate: "Dec 10, 2024",
            endDate: "Dec 18, 2024",
            totalRupees: "₹75,000",
            image: require('../assets/images/tripPage4.png'),
        },
    ];

    return (
        <div className="container py-4" style={styles.container}>
            <div className="row">
                {trips.map((trip) => (
                    <div
                        key={trip.id}
                        className="col-12 col-lg-6 mb-4 d-flex justify-content-center"
                    >
                        <div style={styles.imageContainer}>
                            <img
                                src={trip.image}
                                alt={trip.tripName}
                                style={styles.image}
                            />
                            {/* Overlay container */}
                            <div id="tripDetails" style={styles.textOverlay}>
                                {/* Trip name and total money */}
                                <div style={styles.topDetails}>
                                    <h4 id="tripName" style={styles.tripName}>
                                        {trip.tripName} Trip
                                    </h4>
                                    <h4
                                        id="tripTotalMoney"
                                        style={styles.tripTotalMoney}
                                    >
                                        {trip.totalRupees}
                                    </h4>
                                </div>
                            </div>
                                {/* Start and End date */}
                                <h4 id="startDate" style={styles.startDate}>
                                    {trip.startDate}
                                </h4>
                                <h4 id="endDate" style={styles.endDate}>
                                    {trip.endDate}
                                </h4>
                                <h4 id="stampTripName" style={styles.stampTripName}>
                                    {trip.tripName}
                                </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        // backgroundColor: '#f0f0f0',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
    },
    image: {
        width: '100%',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    textOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    topDetails: {
        padding: '10px',
        color: '#444f89',
        textAlign: 'center',
        borderRadius: '8px',
        marginTop: '70px',
        width: '100%',
    },
    tripName: {
        margin: 0,
        fontSize: '30px',
    },
    tripTotalMoney: {
        margin: 0,
        fontSize: '18px',
    },
    startDate: {
        position: 'absolute',
        bottom: '88px',
        right: '54px',
        color: '#444f89',
        padding: '5px 0px',
        borderRadius: '5px',
        fontSize: '17px',
        transform:'rotate(-20deg)',
    },
    endDate: {
        position: 'absolute',
        bottom: '40px',
        right: '26px',
        color: '#444f89',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '17px',
        transform:'rotate(-20deg)',
    },
    stampTripName:{
        position: 'absolute',
        bottom: '50px',
        left: '240px',
        color: '#444f89',
        textAlign:"center",
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '12px',
        // width: '100%',
        transform:'rotate(-20deg)',
    }
};

export default TripDetails;
