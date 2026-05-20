const nodemailer = require("nodemailer");
require("dotenv").config();

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter on startup — minimal output
transporter.verify((error) => {
  if (error) {
    console.error("Email service init failed:", error.message);
  } else {
    console.log("✅ Email service ready");
  }
});

// Send email
const sendEmail = async (to, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error.message);
    return { success: false, message: error.message };
  }
};

module.exports = { sendEmail };
