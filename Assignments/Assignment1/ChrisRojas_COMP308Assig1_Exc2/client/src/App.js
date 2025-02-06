import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import GameCollection from './components/GameCollection';
import AddGame from './components/AddGame';
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute
import Navbar from './components/Navbar';  // Import Navbar

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  {/* Add the Navbar component here */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Use PrivateRoute for protected routes */}
          <Route 
            path="/games" 
            element={<PrivateRoute element={<GameCollection />} />}  // Protected route
          />
          <Route 
            path="/add-game" 
            element={<PrivateRoute element={<AddGame />} />}  // Protected route
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
