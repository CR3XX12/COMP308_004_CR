const express = require('express');
const Game = require('../models/Game');
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

// Delete a game
router.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.status(200).send('Game deleted');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
