import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);  // Store the user data after sign-up
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation (at least 8 characters)
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Sign-up (POST request) - Register the user
      const response = await fetch('http://localhost:8082/api/auth/signup', { // Change to your actual sign-up endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign-up successful:', data);
        // Save the JWT token in localStorage or state
        localStorage.setItem('authToken', data.token);
        setUser(data.user);  // Store the user data received from the server

        navigate('/home');  // Redirect to the home page after successful sign-up
      } else {
        console.error('Sign-up failed:', data.message);
        alert(data.message);  // Display error message if the sign-up fails
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Something went wrong during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8082/api/auth/update', {  // Replace with actual update endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,  // Include the token in the header
        },
        body: JSON.stringify({ email, password }),  // Update the email and/or password
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Profile updated successfully:', data);
        alert('Profile updated successfully!');
        setUser(data.user);  // Update the user state with the updated data
      } else {
        console.error('Profile update failed:', data.message);
        alert(data.message);  // Display error message if the update fails
      }
    } catch (error) {
      console.error('Error during profile update:', error);
      alert('Something went wrong during the update.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='total'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="form-container">
        {/* Email Field */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}  // Toggle between text and password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={errors.password ? 'input-error' : ''}
            />
            <span onClick={togglePasswordVisibility} className="password-toggle">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {/* Submit Button for Sign Up */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {/* Profile Update Form (only displayed after successful sign-up) */}
      {user && (
        <div className="profile-update-container">
          <h3>Update Profile</h3>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label>New Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span onClick={togglePasswordVisibility} className="password-toggle">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Updating Profile...' : 'Update Profile'}
            </button>
          </form>
        </div>
      )}

      {/* Link to Sign In Page */}
      <p>Already have an account? <Link to="/Login">Login</Link></p>
    </div>
  );
};

export default SignUp;
