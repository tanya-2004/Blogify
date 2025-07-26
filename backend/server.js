const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration for production
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from localhost, 127.0.0.1, Vercel URLs, or undefined (for curl/devtools/preflight)
    if (!origin || 
        origin.startsWith('http://localhost') || 
        origin.startsWith('http://127.0.0.1') || 
        origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log('❌ CORS not allowed for origin:', origin);
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));