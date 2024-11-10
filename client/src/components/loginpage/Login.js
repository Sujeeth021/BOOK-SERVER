import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log('Logging in with:', email, password);
    

    navigate('/home', { replace: true });
  };

  return (
    <div className='total'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {<p>Don't have an account? <Link to="/signin">Sign Up</Link></p>}
    </div>
  );
};

export default Login;
