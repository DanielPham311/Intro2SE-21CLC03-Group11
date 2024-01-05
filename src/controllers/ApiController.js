const AccountService = require("../services/Authentication_Service");
const MailService = require("../services/SendEmailService");
const MovieService = require("../services/MovieService");

const controller = {};

controller.isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

controller.resetPasswordByEmail = async (req, res) => {
  const DEFAULT_PASSWORD_LENGTH = 12;
  const { type, data } = req.body;
  if (data == null || !controller.isValidEmail(data)) {
    res.status(400).json({ message: "Your email is not qualified" });
    return;
  }

  const user = await AccountService.getAccountByEmail(data);
  if (user == undefined || user == null) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    // generate new password
    const newPassword = AccountService.generateNewPassword(
      DEFAULT_PASSWORD_LENGTH
    );
    console.log("New Password: [", newPassword, "]");
    // reset password
    await AccountService.updateAccountPassword(user.account_id, newPassword);
    // send email to user
    MailService.sendEmail(user.email, newPassword);
  } catch (err) {
    return res.status(501).json({ message: "Server error" });
  }

  return res.status(200).json({ message: "Password has been reset" });
};

controller.resetPasswordByPhoneNumbers = async (req, res) => {
  res.status(200).json({ message: "TEST" });
};

controller.checkValidMovie = async (req, res) => {
  const movie_id = req.params.movie_id;

  const mov = await MovieService.getMovieById(movie_id);

  if (mov != undefined) {
    if (
      mov.dataValues.video_link == null ||
      mov.dataValues.video_link == undefined ||
      mov.dataValues.video_link == ''
    ) {
      return res
        .status(401)
        .json({
          message: "Movie hiện chưa được cập nhật. Xin bạn quay lại lần sau!",
        });
    }
    return res.status(200).json({ message: "Movie available" });
  }
  return res
    .status(401)
    .json({
      message: "Movie hiện chưa được cập nhật. Xin bạn quay lại lần sau!",
    });
};

module.exports = controller;
