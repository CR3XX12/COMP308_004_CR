import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GameCollection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize navigate to redirect after sign out

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');  // Redirect to login if no token is found
          return;
        }
        const response = await axios.get('http://localhost:5000/api/games', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load games');
        setLoading(false);
      }
    };

    fetchGames();
  }, [navigate]);

  // Handle game removal
  const handleRemoveGame = async (gameId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/games/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGames(games.filter((game) => game._id !== gameId));  // Remove game from local state
    } catch (err) {
      setError('Failed to remove game');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Game Collection</h2>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <h3>{game.title}</h3>
            <p>{game.genre} - {game.platform}</p>
            <p>{game.description}</p>
            <button onClick={() => handleRemoveGame(game._id)}>Remove Game</button>  {/* Remove button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameCollection;
