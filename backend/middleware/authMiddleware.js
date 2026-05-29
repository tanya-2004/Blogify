const jwt = require('jsonwebtoken');

// Standard authentication: verifies token, attaches req.userId
exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]?.trim();

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET missing');
    return res.status(500).json({ success: false, message: 'Server configuration error' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;   // only id, no DB query
    next();
  } catch (err) {
    let message = 'Invalid or expired token';
    if (err.name === 'TokenExpiredError') message = 'Token expired. Please log in again.';
    if (err.name === 'JsonWebTokenError') message = 'Invalid token format.';
    return res.status(401).json({ success: false, message });
  }
};

// Optional auth: if token provided, attach userId; otherwise continue as guest
exports.optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]?.trim();

  if (token && process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
    } catch (err) {
      // ignore invalid token for optional auth
    }
  }
  next();
};