import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';  // Added useNavigate for redirecting after logout

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();  // To redirect after logout
  const token = localStorage.getItem('token');  // Check if the token exists in localStorage

  // Check for token on initial load and whenever it changes
  useEffect(() => {
    setIsLoggedIn(!!token);  // Set logged in state based on token
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setIsLoggedIn(false);  // Update the isLoggedIn state
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Game Library</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!isLoggedIn ? (  // Show these links if the user is NOT logged in
              <>
                <li className="nav-item">
                  {location.pathname !== "/login" && (
                    <Link className="nav-link" to="/login">Login</Link>
                  )}
                </li>
                <li className="nav-item">
                  {location.pathname !== "/register" && (
                    <Link className="nav-link" to="/register">Register</Link>
                  )}
                </li>
              </>
            ) : (  // Show these links if the user IS logged in
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/games">Your Games</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-game">Add Game</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>  {/* Logout Button */}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
