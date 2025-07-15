// routes/reels.js
const express = require('express');
const router = express.Router();
const Posts = require('../models/Posts');
const authMiddleware = require('../middleware/authMiddleware.js');


// POST /api/reels - Save reel to DB
router.post('/', authMiddleware, async (req, res) => {
  const { url, type } = req.body;
  console.log("📥 New posts URL:", url);

  try {
    const newPost = new Posts({ url, type});
    await newPost.save();
    res.status(201).json({ success: true, posts: newPost });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/reels - Get all reels
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
