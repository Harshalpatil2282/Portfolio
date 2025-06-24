const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const verifyToken = require("../middleware/verifyToken"); // Adjust path as needed

// Get all skills (public)
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a skill (protected)
router.post("/add", verifyToken, async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: "Skill name is required" });
    }
    const skill = new Skill({ name: req.body.name });
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    console.error("Error adding skill:", err); // This will show the real error in your backend console
    res.status(500).json({ error: err.message });
  }
});

// Edit a skill (protected)
router.put("/edit/:id", verifyToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a skill (protected)
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;