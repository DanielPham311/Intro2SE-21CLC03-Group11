const { Account, User, Admin, SubscriptionPlan } = require("../models"); // adjust the path to your models
const crypto = require("crypto"); // create new hash object to avoid digest already called problem
const passwordGenerator = require("password-generator");

const AuthenticationService = {};
AuthenticationService.getAdminById = async (id) => {
  try {
    const ad = await Admin.findByPk(id);
    return ad.dataValues;
  } catch (error) {
    throw error;
  }
};

AuthenticationService.updateAdmin = async (id, updatedData) => {
  try {
    let admin = await Admin.findByPk(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return await admin.update(updatedData);
  } catch (error) {
    throw error;
  }
};

AuthenticationService.deleteAdmin = async (id) => {
  try {
    let admin = await Admin.findByPk(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return await admin.destroy();
  } catch (error) {
    throw error;
  }
};

AuthenticationService.getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user.dataValues;
  } catch (error) {
    throw error;
  }
};

AuthenticationService.getAllAccountInfo = async () => {
  const res = await Account.findAll();
  return res.map((res) => res.dataValues);
};

AuthenticationService.getAccountByUsername = async (c_username) => {
  const account = await Account.findOne({
    where: {
      username: c_username,
    },
  });
  if (account == null) {
    console.log("Username not exist");
    return null;
  }
  return account.dataValues;
};

AuthenticationService.getAccountByEmail = async (c_email) => {
  const account = await Account.findOne({
    where: {
      email: c_email,
    },
  });
  if (account == null) {
    console.log("Username not exist");
    return null;
  }
  return account.dataValues;
};

AuthenticationService.verifyAccount = async (c_username, c_password) => {
  const hash = crypto.createHash("sha256"); // create new hash object to avoid digest already called problem
  hash.update(c_password);
  const digest = hash.digest("hex");
  const account = await AuthenticationService.getAccountByUsername(c_username);
  if (account == null) return false;
  return digest == account.password;
};

AuthenticationService.createAdmin = async (adminData) => {
  try {
    return await Admin.create(adminData);
  } catch (error) {
    throw error;
  }
};

AuthenticationService.createSubscriptionPlan = async (subscriptionPlanData) => {
  try {
    return await SubscriptionPlan.create(subscriptionPlanData);
  } catch (error) {
    throw error;
  }
};
AuthenticationService.createUser = async (UserData) => {
  const newUser = await User.create(UserData);
  // first user account to be created will be create with Free Subscription Plan, they can upgrade later
  const defaultPlan = await createSubscriptionPlan({
    user_id: newUser.dataValues.user_id,
    subscription_id: 1,
  });
  return newUser;
};

// CREATE operation, role: 'admin','user'
AuthenticationService.createAccount = async (
  c_username,
  c_password,
  c_role,
  c_email
) => {
  if (c_role == null) {
    console.log("Role cannot be null");
    return null;
  }
  let digest = null;
  if (c_password != null) {
    const hash = crypto.createHash("sha256");
    hash.update(c_password);
    digest = hash.digest("hex");
  }
  const newAccount = await Account.create({
    username: c_username,
    password: digest,
    role: c_role,
    email: c_email,
  });
  if (c_role == "user") {
    // insert into User table
    const newUser = await createUser({
      user_id: newAccount.dataValues.account_id,
    });
  } else if (c_role == "admin") {
    // insert into Admin table
    const newAdmin = await createAdmin(newAccount.dataValues.account_id, null);
  }
  return newAccount;
};

// UPDATE operation
AuthenticationService.updateAccount = async (accountId, newData) => {
  const [updatedRowsCount] = await Account.update(newData, {
    where: { account_id: accountId },
  });
  return updatedRowsCount > 0;
};

AuthenticationService.getAccountById = async (accountId) => {
  const account = await Account.findByPk(accountId);
  return account;
};

AuthenticationService.updateAccountPassword = async (
  accountId,
  newPassword
) => {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  hash.update(newPassword);
  const digest = hash.digest("hex");
  const [updatedRowsCount] = await Account.update(
    { password: digest },
    {
      where: { account_id: accountId },
    }
  );
  return updatedRowsCount > 0;
};

// DELETE operation
// you can use either userID or accountID here, they are the same
AuthenticationService.deleteAccount = async (accountId) => {
  let deletedAcc = await getAccountById(accountId);
  if (deletedAcc == null) {
    console.log("No account with this ID is found");
    return;
  }
  deletedAcc = await Account.destroy({
    where: { account_id: accountId },
  });
  return deletedAcc > 0;
};

AuthenticationService.generateNewPassword = () => {
  const passwordConfig = {
    length: 12, // Set the length of the password
    numbers: true, // Include numbers
    symbols: true, // Include symbols
    uppercase: true, // Include uppercase letters
    lowercase: true, // Include lowercase letters
  };

  return passwordGenerator(passwordConfig);
};

module.exports = AuthenticationService;
