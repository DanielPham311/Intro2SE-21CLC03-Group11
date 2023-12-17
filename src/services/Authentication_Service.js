const { Account , User, Admin, SubscriptionPlan} = require('../models'); // adjust the path to your models
const crypto = require('crypto'); // for some stuffs
const hash = crypto.createHash('sha256');

async function getAdminById(id) {
  try {
    return await Admin.findByPk(id);
  } catch (error) {
    throw error;
  }
}

async function getAllAccountInfo()
{
  const res = await Account.findAll();
  return res.map(res => res.dataValues);
}

async function getAccountByUsername(c_username)
{
    const account = await Account.findOne({
      where: {
          username: c_username
      }
  });
  if (account == null)
  {
    console.log("Username not exist");
    return null;
  }
  return account.dataValues;
}

async function getAccountByEmail(c_email)
{
    const account = await Account.findOne({
      where: {
          email: c_email
      }
  });
  if (account == null)
  {
    console.log("Username not exist");
    return null;
  }
  return account.dataValues;
}

async function verifyAccount(c_username, c_password)
{
  hash.update(c_password);
  const digest = hash.digest('hex');
  const account = await getAccountByUsername(c_username);
  // console.log(account);
  if (account == null) return false;
  return (digest == account.password);
}

async function createAdmin(adminData) {
  try {
    return await Admin.create(adminData);
  } catch (error) {
    throw error;
  }
}
async function createSubscriptionPlan(subscriptionPlanData) {
  try {
    return await SubscriptionPlan.create(subscriptionPlanData);
  } catch (error) {
    throw error;
  }
}
async function createUser(UserData) 
{
  const newUser = await User.create(UserData);
  // first user account to be created will be create with Free Subscription Plan, they can upgrade later
  const defaultPlan = await createSubscriptionPlan(
      {
          user_id: newUser.dataValues.user_id,
          subscription_id: 1
      }
  );
  return newUser;
}

// CREATE operation, role: 'admin','user'
async function createAccount(c_username, c_password, c_role, c_email) {
  if (c_role == null) 
  {
    console.log('Role cannot be null');
    return null;
  }
  let digest = null;
  if (c_password != null)
  {
    hash.update(c_password);
    digest = hash.digest('hex');
  }
  const newAccount = await Account.create({
      username: c_username,
      password: digest,
      role : c_role,
      email: c_email
  });
  if (c_role == 'user')
  {
    // insert into User table
    const newUser = await createUser({ user_id : newAccount.dataValues.account_id });
  }
  else if (c_role == 'admin')
  {
    // insert into Admin table
    const newAdmin = await createAdmin(newAccount.dataValues.account_id, null);
  }
  return newAccount;
}

// UPDATE operation
async function updateAccount(accountId, newData) {
  const [updatedRowsCount] = await Account.update(newData, {
      where: { account_id: accountId }
  });
  return updatedRowsCount > 0;
}

async function getAccountById(accountId) {
  const account = await Account.findByPk(accountId);
  return account;
}

async function updateAccountPassword(accountId, newPassword) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256');
  hash.update(newPassword);
  const digest = hash.digest('hex');
  const [updatedRowsCount] = await Account.update({password: digest}, {
      where: { account_id: accountId }
  });
  return updatedRowsCount > 0;
}

// DELETE operation
// you can use either userID or accountID here, they are the same
async function deleteAccount(accountId) {
  let deletedAcc = await getAccountById(accountId);
  if (deletedAcc == null) 
  {
    console.log("No account with this ID is found");
    return;
  }
  deletedAcc = await Account.destroy({
    where: { account_id: accountId }
  });
  return deletedAcc > 0;
}

module.exports = {
    verifyAccount: verifyAccount,
    getAllAccountInfo: getAllAccountInfo,
    getAccountByUsername: getAccountByUsername,
    getAccountByEmail: getAccountByEmail,
    getAdminById: getAdminById,
    createAccount: createAccount,
    getAccountById: getAccountById,
    updateAccount: updateAccount,
    updateAccountPassword: updateAccountPassword,
    deleteAccount: deleteAccount,
};