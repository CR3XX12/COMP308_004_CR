import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GameDetails = () => {
  const { gameId } = useParams();  // Get the gameId from the URL params
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/games/${gameId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGame(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load game details');
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{game.title}</h2>
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Platform:</strong> {game.platform}</p>
      <p><strong>Developer:</strong> {game.developer}</p>
      <p><strong>Release Year:</strong> {game.releaseYear}</p>
      <p><strong>Rating:</strong> {game.rating}</p>
      <p><strong>Description:</strong> {game.description}</p>
    </div>
  );
};

export default GameDetails;
