const router = require("express").Router();
const passport = require("passport");
const AuthenService = require("../services/Authentication_Service");

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: "Invalid username or password",
    successRedirect: "/",
  })
);

router.post("/register", async (req, res, next) => {
  const { username, password, name, birthday, emailAddress } = req.body;
  try {
    const Account = await AuthenService.createAccount(
      username,
      password,
      "user",
      emailAddress,
      {
        name: name,
        birthday: birthday,
      }
    ); // default user
    if (Account != undefined) {
      res.status(200).json({
        message: "Account created",
      });
    }
  } catch (err) {
    const message = err.message;
    res.status(401).json({
      message: message,
    });
  }
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get("/login", (req, res) => {
  const messages = req.session.messages || [];
  if(messages != []) {
    const message = messages[0];
    if (message == 'Invalid username or password') {
      return res.render("login", { layout: "functional_layout", css_file_name: "login", err_msg: message, err: true});
    }
  }
  res.render("login", { layout: "functional_layout", css_file_name: "login" });
});

router.get("/login-success", (req, res, next) => {
  res.redirect("/index");
});

router.get("/login-failure", (req, res, next) => {
  res.redirect("/login");
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  console.log('User logout');
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    // Clear the session cookie
    res.clearCookie('connect.sid');  // Replace 'connect.sid' with your actual cookie name

    // Additional cleanup or actions can be added here
    res.redirect("/login");
  });
});

router.get("/register", (req, res, next) => {
  res.render("register", { layout: "functional_layout" });
});

router.get("/forgot", (req, res) => {
  res.render("forgot", { layout: "functional_layout" });
});

module.exports = router;
