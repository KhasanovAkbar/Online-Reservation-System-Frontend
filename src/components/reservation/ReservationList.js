// ReservationList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ReservationList.css'; // Adjust the path based on your project structure


const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservations/user/${userId}`);
                setReservations(response.data.entities[0]);
                console.log(response.data.entities[0])
            } catch (error) {
                console.error('Error fetching reservations:', error.message);
            }
        };

        fetchReservations();
    }, [userId]);

    console.log('State Reservations:', reservations); // Log the state to check the value

    return (
        <div className="reservation-list-container">
            <h2>Your Reservations</h2>
            <div className="scroll-container">
                {Array.isArray(reservations) && reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <div key={reservation.id} className="reservation-item">
                            <div className="reservation-item-border">
                            <p>
                                <strong>Full Name:</strong> {reservation.firstName} {reservation.lastName}
                            </p>
                            <p>
                                <strong>From City:</strong> {reservation.fromCity}
                            </p>
                            <p>
                                <strong>To City:</strong> {reservation.toCity}
                            </p>
                            <p>
                                <strong>Reservation Date:</strong> {reservation.reservationDate}
                            </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reservations found.</p>
                )}
            </div>
            <Link to="/reservation">
                <button className="reservation-button">Make Reservation</button>
            </Link>
        </div>
    );
};

export default ReservationList;
