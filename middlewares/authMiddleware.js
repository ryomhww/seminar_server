const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Memeriksa format token (Bearer <token>)
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const userToken = tokenParts[1];

  jwt.verify(userToken, config.jwt.secret, (err, user) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;