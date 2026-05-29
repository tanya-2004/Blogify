const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const sanitizeBody = require('./middleware/sanitizeBody');

const app = express();

// 🔐 Security
app.use(helmet());

// 🌐 CORS (improved origin check)
const allowedOrigins = [
  'http://localhost:3000',
  /\.vercel\.app$/,
  /\.github\.dev$/,
  /\.codespaces\.github\.com$/
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(pattern =>
      pattern instanceof RegExp ? pattern.test(origin) : pattern === origin
    );
    if (allowed) callback(null, true);
    else callback(new Error('CORS not allowed'));
  },
  credentials: true
}));

// 📝 Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 🚦 Rate limiting for auth and API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/auth', limiter);
app.use('/api/', limiter);

// Body parsing and sanitisation
app.use(express.json());
app.use(sanitizeBody); // we keep it for trimming but note limitations

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ success: true, timestamp: new Date().toISOString() });
});

// 🧠 Global error handler (must be after all routes)
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// 🔌 MongoDB connection
const startServer = async () => {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in .env');
    process.exit(1);
  }
  if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI.trim());
    console.log('✅ MongoDB connected');

    const PORT = (process.env.PORT || 5000).toString().trim();
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down gracefully...');
      server.close(async () => {
        await mongoose.connection.close();
        console.log('MongoDB disconnected');
        process.exit(0);
      });
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

startServer();