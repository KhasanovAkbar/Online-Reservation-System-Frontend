// src/components/login/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import {BarLoader} from "react-spinners"; // Import your CSS file

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Access the navigate function to programmatically navigate
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        // Create a user object with the login data
        const user = {
            email,
            password,
        };

        try {
            // Make a POST request to your login endpoint
            const response = await axios.post('http://localhost:8080/auth/login', user);

            // Handle the response
            if (response.status === 200 && response.data.entities[0] !== null) {
                // Display a success message to the user
                window.alert("Login successfully");

                // Save the token and userId in local storage
                const user = response.data.entities[0];
                localStorage.setItem('userId', user.userId);
                localStorage.setItem('fullName', user.fullName);
                localStorage.setItem('email', user.email);

                // Redirect to a dashboard or home page after successful login
                navigate('/reservation'); // Adjust the route based on your application structure
            } else {
                console.error('Unexpected response structure:', response);
                window.alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Login failed:', error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {loading && <BarLoader color="#36D7B7" loading={loading} height={10} width={200}/>}

                </div>

                <button style={{ opacity: 1 }}>Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
};

export default Login;
