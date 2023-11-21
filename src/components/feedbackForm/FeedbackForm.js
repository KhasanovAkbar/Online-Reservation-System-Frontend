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
