import nodemailer from 'nodemailer';

/**
 * High-level email helper function
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 */
const sendEmail = async ({ to, subject, html,text }) => {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Get email content based on type

  const mailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject,
    html,
    text,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error:any) {
    console.error('❌ Email failed:', error);
    return { success: false, error: error.message };
  }
};
export default sendEmail;