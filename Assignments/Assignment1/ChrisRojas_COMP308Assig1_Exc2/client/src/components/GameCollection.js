import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameCollection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
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
  }, []);

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameCollection;
