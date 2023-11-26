import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [theme, setTheme] = useState(false);
    const changeTheme = () => {
        setTheme(!theme)
    }
    return (
        <main className={theme ? "dark" : ""}>
            <div
                class="relative flex flex-col h-[100vh] items-center justify-center bg-white dark:bg-black transition-bg">
                <div className="home-container">
                    <h2 className="welcome-message">
                        Welcome to Bus Ticket Reservation System
                    </h2>
                    <div className="button-container">
                        <Link to="/register">
                            <button className="register-button">Register</button>
                        </Link>
                        <Link to="/login">
                            <button className="login-button">Login</button>
                        </Link>
                        <Link to="/feedback">
                            <button className="feedback-button">Feedback</button>
                        </Link>
                    </div>
                </div>

                <div class="absolute inset-0 overflow-hidden">
                    <div class="jumbo absolute -inset-[10px] opacity-50"></div>
                </div>

                <div class="absolute top-4 right-4">
                    <button
                        onClick={changeTheme}
                        class="px-3 py-1 border border-stone-400 rounded-full drop-shadow-sm text-sm text-stone-800 dark:text-white bg-white/40 dark:bg-black/40 backdrop-blur-lg hover:border-stone-300 transition-colors dark:border-stone-500 dark:hover:border-stone-400">
                        Toggle Theme
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Home;
