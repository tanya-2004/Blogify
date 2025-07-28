const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware with full user hydration
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]?.trim();
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is missing in environment config');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.log('Auth (with user) - Token error:', err.message);
    return res.status(401).json({
      message:
        err.name === 'TokenExpiredError'
          ? 'Token expired. Please log in again.'
          : 'Invalid or expired token.'
    });
  }
};

// Middleware that just verifies token, adds user ID
exports.tokenOnly = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1]?.trim();

  console.log('Auth (tokenOnly) - Token received:', token ? 'Yes' : 'No');
  console.log('Auth (tokenOnly) - Full header:', authHeader);

  if (!token) {
    console.log('Auth (tokenOnly) - No token provided');
    return res.status(401).json({ msg: 'No token provided. Access denied.' });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is missing in environment config');
    return res.status(500).json({ msg: 'Server configuration error' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth (tokenOnly) - Token verified for user:', verified.id);
    req.user = verified.id;
    next();
  } catch (err) {
    console.log('Auth (tokenOnly) - Token verification failed:', err.message);
    return res.status(401).json({
      msg:
        err.name === 'TokenExpiredError'
          ? 'Token has expired. Please log in again.'
          : err.name === 'JsonWebTokenError'
            ? 'Invalid token format.'
            : 'Token verification failed.'
    });
  }
};