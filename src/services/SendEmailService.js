const nodemailer = require("nodemailer");
const MailService = {};

MailService.sendEmail = async (userEmail, newPassword) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    subject: "Password Reset",
    text: `Your new password is: ${newPassword}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = MailService;
