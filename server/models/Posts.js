const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
url: {
    type: String,
    required: true,
  },

type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  // userId: String, // optional
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Posts', postSchema);