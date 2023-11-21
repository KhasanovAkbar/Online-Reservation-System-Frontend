// src/components/home/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h2 className="welcome-message">Welcome to Bus Ticket Reservation System</h2>
            <div className="button-container">
                <Link to="/register">
                    <button className="register-button">Register</button>
                </Link>
                <Link to="/login">
                    <button className="login-button">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
