const router = require("express").Router();
const passport = require("passport");
const { createAccount } = require("../services/Authentication_Service");

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/",
  })
);

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const Account = await createAccount(username, password, "user", username);
  if (Account != undefined) {
    res.redirect("/login");
  }

  res.render("/register", { layout: "functional_layout" });
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get("/login", (req, res) => {
  res.render("login", { layout: "functional_layout" });
});

router.get("/login-success", (req, res, next) => {
  res.redirect("/index");
});

router.get("/login-failure", (req, res, next) => {
  res.redirect("/login");
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // Additional cleanup or actions can be added here
    res.redirect("/login");
  });
});

router.get("/register", (req, res, next) => {
  res.render("register", { layout: "functional_layout" });
});

module.exports = router;
