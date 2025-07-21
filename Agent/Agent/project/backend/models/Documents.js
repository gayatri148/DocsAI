const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  fileUrl: String,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);