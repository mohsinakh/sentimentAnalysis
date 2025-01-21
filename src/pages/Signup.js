import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Signup.css';



const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    try {
      // First, check if the username or email already exists
      const checkResponse = await fetch('https://sentiment-analysis-api-eight.vercel.app/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, email: formData.email }),
      });

      const checkData = await checkResponse.json();
      if (checkData.error) {
        setError(checkData.error);
        return;
      }

      // Send a POST request to the backend to register the user
      const response = await fetch('https://sentiment-analysis-api-eight.vercel.app/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful registration, navigate to login page
        navigate('/login');
      } else {
        // Handle registration error
        const data = await response.json();
        setError(data.detail || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to register, please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="signup-button" type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <span className="login-button" onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
