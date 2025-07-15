const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const authMiddleware = require("../middleware/authMiddleware");

// Get all messages between two users
router.get("/:receiverId", authMiddleware, async (req, res) => {
  const senderId = req.userId;
  const { receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Send a message
router.post("/", authMiddleware, async (req, res) => {
  const senderId = req.userId;
  const { receiverId, content } = req.body;

  if (!receiverId || !content) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
