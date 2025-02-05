const express = require('express');
const Game = require('../models/Game');
const User = require('../models/User');
const router = express.Router();

// Create a new game
router.post('/', async (req, res) => {
  const { title, genre, platform, releaseYear, developer, rating, description } = req.body;
  const game = new Game({ title, genre, platform, releaseYear, developer, rating, description });

  try {
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get game details by ID
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a game to the user's collection
router.post('/:userId/add', async (req, res) => {
  const { gameId } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if the game is already in the user's collection
    if (user.games.includes(gameId)) {
      return res.status(400).json({ error: 'Game already in collection' });
    }

    user.games.push(gameId);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a game from the user's collection
router.delete('/:userId/remove/:gameId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.games.pull(req.params.gameId);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a game (Admin or owner can delete the game)
router.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.status(200).send('Game deleted');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
