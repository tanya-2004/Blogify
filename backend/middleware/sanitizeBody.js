module.exports = (req, _, next) => {
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      const value = req.body[key];
      // Trim strings
      if (typeof value === 'string') {
        req.body[key] = value.trim();
      }

      // Trim array of strings
      if (Array.isArray(value)) {
        req.body[key] = value.map(item =>
          typeof item === 'string' ? item.trim() : item
        );
      }

      // Trim strings inside nested objects (shallow scan)
      if (typeof value === 'object' && !Array.isArray(value)) {
        for (const nestedKey in value) {
          if (typeof value[nestedKey] === 'string') {
            value[nestedKey] = value[nestedKey].trim();
          }
        }
      }
    }
  }

  next();
};