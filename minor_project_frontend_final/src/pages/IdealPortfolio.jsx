import React, { useState } from 'react';
import './IdealPortfolio.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IdealPortfolio = () => {
  const navigate = useNavigate();

  const questions = [
    { id: 'question1', label: 'How much financial knowledge do you have?', options: ['Beginner', 'Intermediate', 'Advanced'] },
    { id: 'question2', label: 'How old are you?', type: 'input', inputType: 'number' },
    { id: 'question3', label: 'How do you feel about short-term fluctuations?', options: ['Very Comfortable', 'Somewhat Comfortable', 'Not Comfortable'] },
    { id: 'question4', label: 'What is your risk appetite?', options: ['Low', 'Medium', 'High'] },
    { id: 'question5', label: 'What is your investment horizon?', options: ['Short-term (1-5 years)', 'Mid-term (5-10 years)', 'Long-term (Above 10 years)'] },
    { id: 'question6', label: 'What is your current financial goal?', options: ['Stability', 'Wealth Growth', 'Retirement'] },
  ];

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelect = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleChange = (e, questionId) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: e.target.value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const unansweredQuestions = questions.filter(
      (question) => !selectedOptions[question.id]
    );

    if (unansweredQuestions.length > 0) {
      alert('Please answer all the questions.');
    } else {
      const formData = {
        age: selectedOptions['question2'],
        knowledge_level: selectedOptions['question1'],
        short_term_fluctuations: selectedOptions['question3'],
        risk_appetite: selectedOptions['question4'],
        investment_horizon: selectedOptions['question5'],
        financial_goal: selectedOptions['question6'],
      };

      const csrftoken = getCookie('csrftoken');
      const token = localStorage.getItem('token');  // Retrieve the JWT token

      axios.post('http://localhost:8000/api/portfolio/generate_portfolio/', formData, {
        headers: {
          'X-CSRFToken': csrftoken,
          'Authorization': `Bearer ${token}`,  // Include the JWT token
        },
      })
        .then(response => {
          console.log(response.data);
          navigate('/portfolio-composition');
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };

  return (
    <div className="ideal-portfolio-container">
      <Navbar />
      <form onSubmit={handleSubmit} className="ideal-portfolio-form">
        <h2>Ideal Portfolio Questionnaire</h2>
        {questions.map((question, index) => (
          <div className="form-row" key={question.id}>
            <div className="form-group">
              <label>{index + 1}. {question.label}</label>
              {question.type === 'input' ? (
                <input
                  type={question.inputType}
                  value={selectedOptions[question.id] || ''}
                  onChange={(e) => handleChange(e, question.id)}
                  placeholder={question.label}
                />
              ) : (
                <div className="button-group">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={selectedOptions[question.id] === option ? 'selected' : ''}
                      onClick={() => handleSelect(question.id, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IdealPortfolio;
