const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Game Library API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const gameRoutes = require('./routes/games');
const authRoutes = require('./routes/auth');

app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes);
