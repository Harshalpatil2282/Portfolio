const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// Route imports
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projects");
const skillsRoutes = require("./routes/skills");
const { router: authRouter, verifyToken } = require("./routes/auth");



const app = express();
const PORT = process.env.PORT ;

const _dirname = path.resolve();

// const corsOptions = {
//   origin:"https://hp-portfolio-ujjo.onrender.com",
//   Credentials: true
// }

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRouter);
app.use("/api/skills", skillsRoutes);

app.use(express.static(path.join(_dirname, "..","client/build")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "..","client","build", "index.html"));
})




// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
