import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import IdealPortfolio from './pages/IdealPortfolio';
import PortfolioComposition from './pages/PortfolioComposition';

import './App.css';

// Check if user is authenticated
const isAuthenticated = () => !!localStorage.getItem('token'); 

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/about" element={<ProtectedRoute element={<About />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
        <Route path="/ideal-portfolio" element={<ProtectedRoute element={<IdealPortfolio />} />} />
        <Route path="/portfolio-composition" element={<ProtectedRoute element={<PortfolioComposition />} />} />
      </Routes>
    </Router>
  );
};

export default App;
