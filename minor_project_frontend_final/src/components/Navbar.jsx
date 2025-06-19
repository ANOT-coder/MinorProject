import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
    const handleLogout = () => {
        // Logic for logging out (e.g., clearing local storage or tokens)
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login after logout
    };

    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img src="/Logo.jpg" alt="Project Logo" className="navbar-logo" />
                <ul className="navbar-links">
                    <li>
                        <Link to="/home" className="navbar-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="navbar-link">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="navbar-link">Contact</Link>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="navbar-link">Login</Link>
                        )}
                    </li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
