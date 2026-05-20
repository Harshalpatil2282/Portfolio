const mongoose = require("mongoose");

// Stores a single Google Drive (or any public) resume link
const resumeSchema = new mongoose.Schema({
  url: {
    type: String,
    default: "",
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
