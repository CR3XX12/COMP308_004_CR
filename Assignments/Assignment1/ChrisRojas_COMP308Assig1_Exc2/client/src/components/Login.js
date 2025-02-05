import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', user); // Backend API
      setToken(response.data.token);  // Save token to local state (optional)
      localStorage.setItem('token', response.data.token);  // Save token to localStorage
      alert('Login successful!');
      navigate('/games');  // Redirect to the games page after successful login
    } catch (err) {
      alert('Error logging in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
