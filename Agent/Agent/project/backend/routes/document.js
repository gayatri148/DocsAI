const express = require('express');
const Document = require('../models/Documents');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer storage
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

// POST /upload - handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { adminId } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    const newDoc = new Document({
      adminId,
      filename: file.originalname,
      fileUrl: `/uploads/${file.filename}`
    });
    await newDoc.save();
    res.status(201).json({ message: 'File uploaded', document: newDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new document (metadata only, for file upload use multer or similar)
router.post('/', async (req, res) => {
  const { adminId, filename, fileUrl } = req.body;
  try {
    const newDoc = new Document({ adminId, filename, fileUrl });
    await newDoc.save();
    res.status(201).json({ message: 'Document uploaded' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all documents
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find().populate('adminId', 'name email');
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;