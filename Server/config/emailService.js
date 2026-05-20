const nodemailer = require("nodemailer");
require("dotenv").config();

// Log configuration on startup
// console.log("📧 Email Config:");
// console.log("   User:", process.env.EMAIL_USER ? "✓ Set" : "✗ NOT SET");
// console.log("   Password:", process.env.EMAIL_PASSWORD ? "✓ Set" : "✗ NOT SET");
// console.log("   Admin Email:", process.env.ADMIN_EMAIL ? "✓ Set" : "✗ NOT SET");

// Create transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email service error:", error.message);
  } else {
    console.log("✅ Email service ready!");
  }
});

// Send email function
const sendEmail = async (to, subject, htmlContent) => {
  try {
    console.log(`\n📤 Attempting to send email to: ${to}`);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    console.log("   Message ID:", info.messageId);
    console.log("   Response:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    console.error("   Full error:", error);
    return { success: false, message: error.message };
  }
};

module.exports = { sendEmail };

