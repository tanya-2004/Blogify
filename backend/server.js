const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration for production
app.use(cors({
  origin: [
    'http://localhost:3000', // for local development
    'https://blogify-frontend.vercel.app', // replace with your actual Vercel URL
    /\.vercel\.app$/ // allow any vercel subdomain
  ],
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

app.listen(PORT, () => console.log(`Server running on ${PORT}`));