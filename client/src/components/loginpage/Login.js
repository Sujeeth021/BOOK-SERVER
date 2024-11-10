import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    navigate('/home', { replace: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='total'>
      <h2>Login</h2>
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

        <button type="submit" className="submit-button">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signin">Sign Up</Link></p>
    </div>
  );
};

export default Login;
