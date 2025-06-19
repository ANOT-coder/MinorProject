import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email };

    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password/', userData);
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      console.error("There was an error!", error);
      setError(error.response?.data?.error || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}
        <input
          type="email"
          className="login-input"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <button type="submission" className="login-button">Reset Password</button>
        <div className="login-links">
          <p>Remember your password? <a href="/login">Login here</a></p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
