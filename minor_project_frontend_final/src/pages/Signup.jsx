import React, { useState } from 'react'; 
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };
  const csrftoken = getCookie('csrftoken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      await axios.post('http://localhost:8000/api/register/', userData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,  // Include the CSRF token
        },
      });
      navigate('/login');  // Redirect to login page on success
    } catch (error) {
      console.error("There was an error!", error);
      setError(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error-text">{error}</p>}
        <input
          type="text"
          name="username"
          className="login-input"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          className="login-input"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submission" className="login-button">Sign Up</button>
        <div className="login-links">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
