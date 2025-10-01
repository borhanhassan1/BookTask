const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, text) {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL,
    subject,
    html: `<p>${text}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    
    throw new Error("Email could not be sent");
  }
}

module.exports = sendEmail;
