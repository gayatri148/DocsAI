const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const multer = require('multer');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

console.log('Loaded OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { userId, question, area } = req.body;
  try {
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    // Return a dummy answer
    const answer = `This is a dummy answer for your question: "${question}".`;
    // Only include userId/area if present
    const newQuestion = new Question({ question, ...(userId && { userId }), ...(area && { area }) });
    await newQuestion.save();
    res.status(201).json({ message: 'Question posted', answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;