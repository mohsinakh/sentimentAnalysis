import React, { useState, useContext } from 'react';
import "./css/Login.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from './Loading'; // Import the Loading component
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const { login } = useContext(AuthContext); // Access login function from context
  const [formData, setFormData] = useState({ credential: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner

    try {
      const response = await fetch('https://sentiment-analysis-api-eight.vercel.app/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Invalid username/email or password');
      }

      const data = await response.json();
      console.log('Access Token:', data.access_token); // Debug
      console.log('User Data:', data.user); // Debug

      // Use login function from context to store token
      login(data.access_token);

      // Optionally, save the user data in localStorage as well
      localStorage.setItem('user', JSON.stringify(data.user)); 

      // Redirect to profile or another page
      navigate('/profile');
    } catch (err) {
      console.error(err.message);
      setError('Invalid username/email or password'); // Set error message
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {isLoading ? (
        <Loading /> // Show loading spinner while processing
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username or Email:</label>
            <input
              type="text"
              name="credential"
              value={formData.credential}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password input type
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span 
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} {/* Show eye icon depending on the state */}
              </span>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className='btn' type="submit">Login</button>
        </form>
      )}
      <p>
        Don't have an account?{' '}
        <span className="signup-link" onClick={() => navigate('/signup')}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
