import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(''); // To display any error messages
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation: check if email and password are not empty
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError(''); // Reset any previous errors

    try {
      const response = await fetch('http://localhost:8082/api/auth/login', { // Make sure your API URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Save the JWT token in localStorage
        localStorage.setItem('authToken', data.token);
        
        // Redirect to the home page or protected route after successful login
        navigate('/home');
      } else {
        console.error('Login failed:', data.message);
        setError(data.message); // Display the error message from the server
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='total'>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error messages */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input">
            <input 
              type={showPassword ? "text" : "password"} // Toggle between text and password
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
            </span>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;
