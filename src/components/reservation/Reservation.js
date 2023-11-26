// src/components/reservation/Reservation.js

import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BarLoader} from 'react-spinners';
import axios from 'axios';
import polandCities from './PolandCity';
import userStatusList from "./UserStatus";
import './Reservation.css'; // Import your CSS file


const Reservation = () => {
    const [loading, setLoading] = useState(false);

    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userStatus, setUserStatus] = useState('')
    const [selectedFromCity, setSelectedFromCity] = useState('');
    const [selectedToCity, setSelectedToCity] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve userId from local storage
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Create a reservation object with the form data
        const reservation = {
            userId,
            firstName,
            lastName,
            userStatus,
            fromCity: selectedFromCity,
            toCity: selectedToCity,
            reservationDate: selectedDate,
        };

        // Make a POST request to save the reservation
        try {
            const response = await axios.post('http://localhost:8080/api/reservations/create', reservation);

            if (response.status === 200 && response.data.entities[0] !== null) {
                // Display a success message to the user
                window.alert(response.data.entities[0]);
                navigate('/reservation-list');
                // Optionally, you can redirect the user or perform other actions after successful reservation
            } else {
                console.error('Unexpected response structure:', response);
                window.alert('An unexpected error occurred.');
            }
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Reservation failed:', error.message);
            window.alert('An error occurred during reservation.');
        } finally {
            setLoading(false);

        }
    };

    return (
        <div className="reservation-container">
            <h2>Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>User status</label>
                    <select value={userStatus} onChange={(e) => setUserStatus(e.target.value)} required>
                        <option value="" disabled>Select User status</option>
                        {userStatusList.map(status => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>From City:</label>
                    <select value={selectedFromCity} onChange={(e) => setSelectedFromCity(e.target.value)} required>
                        <option value="" disabled>Select From City</option>
                        {polandCities.map(city => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>To City:</label>
                    <select value={selectedToCity} onChange={(e) => setSelectedToCity(e.target.value)} required>
                        <option value="" disabled>Select To City</option>
                        {polandCities.map(city => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required/>
                    {loading && <BarLoader color="#36D7B7" loading={loading} height={10} width={200}/>}

                </div>
                <button style={{opacity: 1}}>Submit Reservation</button>

            </form>
        </div>
    );
};

export default Reservation;
