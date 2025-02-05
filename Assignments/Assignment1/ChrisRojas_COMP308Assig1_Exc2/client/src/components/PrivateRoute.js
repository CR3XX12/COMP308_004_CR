import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Check if the token exists
  return token ? element : <Navigate to="/login" />; // Redirect to /login if no token
};

export default PrivateRoute;
