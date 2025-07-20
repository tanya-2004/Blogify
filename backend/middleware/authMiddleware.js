const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  console.log('Auth middleware - Token received:', token ? 'Yes' : 'No');
  console.log('Auth middleware - Full header:', authHeader);

  if (!token) {
    console.log('Auth middleware - No token provided');
    return res.status(401).json({ msg: 'No token provided. Access denied.' });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    return res.status(500).json({ msg: 'Server configuration error' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Token verified for user:', verified.id);
    req.user = verified.id; // add user info to request
    next();
  } catch (err) {
    console.log('Auth middleware - Token verification failed:', err.message);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired. Please log in again.' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Invalid token format.' });
    } else {
      return res.status(401).json({ msg: 'Token verification failed.' });
    }
  }
};