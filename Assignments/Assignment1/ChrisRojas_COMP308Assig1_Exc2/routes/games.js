const express = require('express');
const Game = require('../models/Game');
const User = require('../models/User');
const router = express.Router();

// Delete a game from user's collection (no need for authentication middleware for now)
router.delete('/:gameId', async (req, res) => {
  try {
    const gameId = req.params.gameId;
    await Game.findByIdAndDelete(gameId);  // Delete game by ID
    res.status(200).send('Game deleted');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
