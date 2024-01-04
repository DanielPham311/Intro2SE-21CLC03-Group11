const nodemailer = require("nodemailer");
const MailService = {};

MailService.sendEmail = async (userEmail, newPassword) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chattingapplication21ktpm4@gmail.com",
      pass: "ehdd vajo acyl npos",
    },
  });

  const mailOptions = {
    from: "noreply.netflex@gmail.com",
    to: userEmail,
    subject: "Password Reset",
    text: `
    Dear beloved user of Netflex,
    
    You have received this message since you requested a password reset on our website.

    Your new password is: ${newPassword}
    
    Please hold on to it very carefully and take actions to change your password as soon as possible
    If you did not request this, please send us an email at netflex@gmail.com
    
    We wish you a wonderful experience with Netflex
    Best Regards,
    Netflex crew`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = MailService;
