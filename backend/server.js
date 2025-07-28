const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// 🛡️ CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost',
      'http://127.0.0.1'
    ];
    if (
      !origin ||
      allowedOrigins.some(base => origin.startsWith(base)) ||
      origin.endsWith('.vercel.app')
    ) {
      callback(null, true);
    } else {
      console.warn('❌ CORS not allowed for origin:', origin);
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true
}));

app.use(express.json());

// 🔍 Global input sanitizer
const sanitizeBody = require('./middleware/sanitizeBody');
app.use(sanitizeBody);

// 🌱 MongoDB connection
mongoose.connect(process.env.MONGO_URI?.trim())
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err.message));

// 🚏 Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

const PORT = process.env.PORT?.trim() || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));