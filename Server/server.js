const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// Route imports
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projects");
const skillsRoutes = require("./routes/skills");
const resumeRoutes = require("./routes/resume");
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
app.use("/api/resume", resumeRoutes);

// Test email endpoint (remove after testing)
const { sendEmail } = require("./config/emailService");
app.get("/api/test-email", async (req, res) => {
  const testEmail = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="background-color: white; padding: 30px; border-radius: 8px;">
        <h2 style="color: #333;">✅ Test Email Success!</h2>
        <p>This is a test email to verify your email configuration is working.</p>
        <p><strong>If you received this, your email service is working correctly!</strong></p>
      </div>
    </div>
  `;
  
  const result = await sendEmail(
    process.env.ADMIN_EMAIL,
    "🧪 Test Email - Portfolio Setup",
    testEmail
  );
  
  res.json({
    success: result.success,
    message: result.message,
    emailTo: process.env.ADMIN_EMAIL
  });
});

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
