const Contact = require('../models/Contact');
const { sendEmail } = require('../config/emailService');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // Save message to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Respond immediately to the user
    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      messageId: contact._id
    });

    // Send email notification to admin in background (non-blocking)
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            📨 New Contact Message
          </h2>
          <div style="margin: 20px 0;">
            <p style="font-size: 14px; color: #666;"><strong>From:</strong> ${name}</p>
            <p style="font-size: 14px; color: #666;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></p>
            <p style="font-size: 14px; color: #666;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6366f1; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; word-wrap: break-word;">${message}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #999;">
              This is an automated email notification from your portfolio contact form.
            </p>
          </div>
        </div>
      </div>
    `;

    (async () => {
      try {
        await sendEmail(
          process.env.ADMIN_EMAIL,
          `📨 New Contact Message from ${name}`,
          adminEmailContent
        );
      } catch (emailError) {
        console.error("Background email send failed:", emailError.message);
      }
    })();

  } catch (err) {
    console.error("Contact form error:", err.message);
    res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  }
};
