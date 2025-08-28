const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const sanitizeBody = require('./middleware/sanitizeBody');

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      'localhost',
      '.vercel.app',
      '.github.dev',
      '.codespaces.github.com'
    ];
    if (!origin || allowed.some(domain => origin.includes(domain))) {
      callback(null, true);
    } else {
      console.warn('❌ CORS not allowed for origin:', origin);
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(sanitizeBody);

mongoose.connect(process.env.MONGO_URI?.trim(), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err.message));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT?.trim() || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});