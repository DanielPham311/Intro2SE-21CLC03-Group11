const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Auth = require('../services/Authentication Service');

const customFields = {
    usernameField: 'username',
    passwordField: 'password',
};

const verifyCallback = async (username, password, callbackDone) => {
    console.log(password);
  try {
    let result = await Auth.verifyAccount(username, password);
    console.log(result);
    if (result == true) {
      const user = await Auth.getAccountByUsername(username);
      callbackDone(null, await user);
    } else {
      return callbackDone(null, false);
    }
  } catch (err) {
    callbackDone(err);
  }
};

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log(user);
  done(null, user.user_id);
});

passport.deserializeUser((userID, done) => {
  Account.findById(userID)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
