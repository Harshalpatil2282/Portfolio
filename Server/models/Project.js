const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  link: String,
  github: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
