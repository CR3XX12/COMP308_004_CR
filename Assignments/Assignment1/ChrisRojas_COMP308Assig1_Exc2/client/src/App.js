import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import GameCollection from './components/GameCollection';
import AddGame from './components/AddGame';
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Game Library</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Use element properly with PrivateRoute */}
          <Route 
            path="/games" 
            element={<PrivateRoute element={<GameCollection />} />}  // Pass the GameCollection component as element
          />
          
          <Route path="/add-game" element={<AddGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
