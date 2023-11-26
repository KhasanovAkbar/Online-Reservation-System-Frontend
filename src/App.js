import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Activation from './components/activation/Activation';
import Reservation from './components/reservation/Reservation';
import ReservationList from './components/reservation/ReservationList';
import Feedback from './components/feedbackForm/FeedbackForm';
import Home from './components/home/Home'; // Import the Home component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/activate" element={<Activation />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/reservation-list" element={<ReservationList />} />
                <Route path="/feedback" component={Feedback} />
            </Routes>
        </Router>
    );
};

export default App;
