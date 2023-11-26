/*
// FeedbackForm.js
import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to send feedback to the backend
        console.log('Submitting Feedback:', formData);
        // You can use an API call to send the feedback to the server
    };

    return (
        <form className={styles.feedbackForm} onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Feedback:
                <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
            </label>
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;
*/
// src/components/feedback/Feedback.js

import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css'; // Import the CSS file

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to submit feedback
            const response = await axios.post('http://localhost:8080/api/feedback/submit', {
                name,
                email,
                feedback,
            });

            // Handle the response as needed (e.g., show a success message)
            console.log('Feedback submitted:', response.data);
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Error submitting feedback:', error.message);
        }
    };

    return (
        <div className={"feedback-container"}>
            <h2>Feedback Page</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Feedback:
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;

