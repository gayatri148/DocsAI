console.log("AUTH ROUTE LOADED", __filename);
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
console.log("DEBUG: typeof User =", typeof User, "modelName:", User && User.modelName);
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request body:', req.body); // Log incoming data
    const { name, email, password, jobRole, role } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      console.log('User already exists:', email, role);
      return res.status(400).json({ error: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create and save the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      jobRole,
      role: role || 'user'
    });
    try {
      await newUser.save();
      console.log('User saved successfully:', email);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (saveErr) {
      console.error('Error saving user:', saveErr);
      res.status(500).json({ error: saveErr.message });
    }
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Return user info (omit password)
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        jobRole: user.jobRole,
        createdAt: user.createdAt,
        lastActive: user.lastActive || new Date(),
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;