const express = require("express");
const router = express.Router();
const { verifyToken } = require("./auth");
const Resume = require("../models/Resume");

// ── GET /api/resume/link  (public) ───────────────────────────────────────────
// Returns the current resume drive link for display on the portfolio
router.get("/link", async (req, res) => {
  try {
    const resume = await Resume.findOne();
    res.json({ url: resume?.url || "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── PUT /api/resume/link  (admin only) ───────────────────────────────────────
// Admin can update the Google Drive / public URL for the resume
router.put("/link", verifyToken, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !url.trim()) {
      return res.status(400).json({ error: "URL is required" });
    }

    let resume = await Resume.findOne();
    if (resume) {
      resume.url = url.trim();
      resume.updatedAt = Date.now();
      await resume.save();
    } else {
      resume = await Resume.create({ url: url.trim() });
    }

    res.json({ success: true, url: resume.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
