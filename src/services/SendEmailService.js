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
    text: `Your new password is: ${newPassword}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = MailService;
