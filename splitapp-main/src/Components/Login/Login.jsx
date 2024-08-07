import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';  // Ensure this path is correct
import { useAuth } from '../AuthContext/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    localStorage.clear();
  }, [])
  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', {
        email,
        password
      });

      const { data } = response;
      login(data.token);
      
      // Store the token in localStorage or sessionStorage if needed
      // localStorage.setItem('userName',name)
      localStorage.setItem('token', data.token);
          
      setMessage('Login successful!');
      // Redirect to the dashboard or home page
      navigate('/Home');
    } catch (error) {
      console.error('Invalid user credentials!', error);
      setMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/">Register</Link>
        </span>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
