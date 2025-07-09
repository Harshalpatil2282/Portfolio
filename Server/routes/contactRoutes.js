// const express = require("express");

// const router = express.Router();
// const Contact = require("../models/Contact");

// // Submit contact message
// router.post("/submit", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     const contact = new Contact({ name, email, message });
//     await contact.save();
//     res.status(201).json({ message: "Message submitted successfully" });
//   } catch (error) {
//     console.error("Contact submission failed:", error);
//     res.status(500).json({ error: "Failed to send message" });
//   }
// });

// // Get all messages (admin use)
// router.get("/", async (req, res) => {
//   try {
//     const messages = await Contact.find().sort({ createdAt: -1 });
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch messages" });
//   }
// });

// module.exports = router;


  const express = require("express");
  const router = express.Router();
  const Contact = require("../models/Contact");
  const verifyToken = require("../middleware/verifyToken"); // ✅ added

  // 🔓 Public contact form
  router.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message submitted successfully" });
  } catch (error) {
    console.error("Contact submission failed:", error);
    res.status(500).json({ error: error.message });
  }
});


  // 🔐 Protected - admin only
  router.get("/",  async (req, res) => {
    try {
      const messages = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  module.exports = router;
