// src/components/register/Register.js

import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {BarLoader} from 'react-spinners';
import axios from 'axios';
import './Register.css';
import userStatusList from "../reservation/UserStatus";


const Register = () => {
    // State for form fields
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState(null);
    const [userStatus, setUserStatus] = useState('');

    // Access the history object to navigate
    const navigate = useNavigate();
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set loading to true before the API request
        setLoading(true);
        // Create a user object with the form data
        const user = {
            fullName,
            email,
            password,
            confirmPassword,
            userStatus
        };

        try {
            // Make a POST request to your registration endpoint
            const response = await axios.post('http://localhost:8080/auth/register', user);

            console.log(response);

            if (response.status === 200 && response.data) {
                // Update the registration message
                setRegistrationMessage(response.data.message);
                window.alert("User successfully register. Click activation link send your email");
                // Redirect to the login page
                navigate('/login');
            } else {
                console.error('Unexpected response structure:', response);
                setRegistrationMessage('An unexpected error occurred.');
                window.alert('An unexpected error occurred.\n' +
                    response.data.message);
            }
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Registration failed:', error.message);
            window.alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {loading && <BarLoader color="#36D7B7" loading={loading} height={10} width={200}/>}
                </div>
                <button type="submit" className="register-button">
                    Register
                </button>
            </form>
            {registrationMessage && (
                <div className={registrationMessage.includes('error') ? 'error-message' : 'success-message'}>
                    {registrationMessage}
                </div>
            )}
            <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
