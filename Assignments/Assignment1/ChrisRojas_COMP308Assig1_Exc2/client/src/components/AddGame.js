import React, { useState } from 'react';
import axios from 'axios';

const AddGame = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [developer, setDeveloper] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGame = { title, genre, platform, releaseYear, developer, rating, description };
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/games', newGame, {
        headers: { Authorization: `Bearer ${token}` }, // Pass token to backend
      });
      alert('Game added to collection');
    } catch (err) {
      alert('Error adding game');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input type="text" placeholder="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
      <input type="number" placeholder="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
      <input type="text" placeholder="Developer" value={developer} onChange={(e) => setDeveloper(e.target.value)} />
      <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add Game</button>
    </form>
  );
};

export default AddGame;
