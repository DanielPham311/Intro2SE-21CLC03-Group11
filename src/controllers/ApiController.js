const AccountService = require("../services/Authentication_Service");
const MailService = require("../services/SendEmailService");

const controller = {};

controller.resetPasswordByEmail = async (req, res) => {
  const data = JSON.parse(req.body).data || [];
  if (data == []) {
    res.status(401).json("Email is null");
  }

  const user = await AccountService.getAccountByEmail(data);
  if (user == undefined) {
    res.status(401).json("User not found");
  }

  try {
    // generate new password
    const newPassword = AccountService.generateNewPassword();
    // reset password
    await AccountService.updateAccountPassword(user.account_id, newPassword);
    // send email to user
    MailService.sendEmail(user.email, newPassword);
  } catch (err) {
    res.status(501).json("Server error");
  }

  res.status(200).json(JSON.stringify("Password had been reset"));
};

controller.resetPasswordByPhoneNumbers = async (req, res) => {
  res.status(200).json(JSON.stringify("hello world"));
};

module.exports = controller;
