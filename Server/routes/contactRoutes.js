const express = require("express");
const router = express.Router();
const { sendMessage } = require("../Controllers/contactController");
const Contact = require("../models/Contact");

// 🔓 Public contact form - submit message with email notification
router.post("/submit", sendMessage);

// Get all messages (accessible to admin panel)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
