const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const verifyToken = require("../middleware/verifyToken"); // Adjust path as needed

// Create a project
// router.post("/add", verifyToken, async (req, res) => {
//   try {
//     const project = new Project(req.body);
//     await project.save();
//     res.status(201).json(project);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { title, description, techStack, image, github, link } = req.body;
    
    // Ensure techStack is stored as an array
    const techStackArray = Array.isArray(techStack)
      ? techStack
      : techStack.split(",").map(tech => tech.trim());

    const project = new Project({
      title,
      description,
      techStack: techStackArray,
      image,
      github,
      link,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a project
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Edit project
router.put("/edit/:id", verifyToken, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
