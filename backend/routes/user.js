const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware for Role-Based Access Control
function authorizeRoles(roles) {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(decoded.role)) return res.status(403).send('Forbidden');
      req.user = decoded; // Attach decoded user info to the request
      next();
    } catch (err) {
      res.status(400).send('Invalid token');
    }
  };
}

// Get user details (any authenticated user)
router.get('/me', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;