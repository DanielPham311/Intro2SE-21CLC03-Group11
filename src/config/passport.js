const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Auth = require("../services/Authentication_Service");
const { Account } = require("../models");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = async (username, password, callbackDone) => {
  console.log(password);
  try {
    let result = await Auth.verifyAccount(username, password);
    console.log(result);
    if (result == true) {
      const user = await Auth.getAccountByUsername(username);
      // demo identify between user and admin account
      if (user.role == "admin") {
        const ad = await Auth.getAdminById(user.account_id);
        console.log(ad);
        console.log(`Welcome administrator ${ad.name}`);
      } else {
        const client = await Auth.getUserById(user.account_id);
        console.log(client);
        console.log(`Welcome user ${client.name}`);
      }
      //----------------------------------------------
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
  console.log("Serialized user");
  console.log(user);
  done(null, user.account_id);
});

passport.deserializeUser((userID, done) => {
  Account.findOne({
    where: {
      account_id: userID,
    },
  })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
