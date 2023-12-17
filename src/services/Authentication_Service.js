const { Account , User, Admin} = require('../models'); // adjust the path to your models
const db = require('./models');
const crypto = require('crypto'); // for some stuffs
const hash = crypto.createHash('sha256');

async function getAccountByUsername(username)
{
    const account = await Account.findOne({
      where: {
          username: username
      }
  });
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

// CREATE operation, role: 'admin','user'
async function createAccount(c_username, c_password, c_role, c_email) {
  hash.update(c_password);
  const digest = hash.digest('hex');
  
  const newAccount = await Account.create({
      username: c_username,
      password: digest,
      role : c_role,
      email: c_email
  });
  if (c_role == 'user')
  {
    // insert into User table
    const newUser = await User.createUser({
      user_id : newAccount.dataValues.account_id
    });
  }
  else if (c_role == 'admin')
  {
    // insert into Admin table
    const newAdmin = await Admin.createAdmin(newAccount.dataValues.account_id, '');
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
async function deleteAccount(accountId) {
  let deletedAcc = await Account.getAccountById(accountId);
  if (deletedAcc == null) 
  {
    console.log("No account with this ID is found");
    return;
  }
  if (deletedAcc.dataValues.role == 'user')
  {
    const deleteUser = await User.deleteUser(deletedAcc.dataValues.account_id);
  }
  else if (deletedAcc.dataValues.role == 'admin')
  {
    const deleteUser = await Admin.deleteAdmin(deletedAcc.dataValues.account_id);
  }
  deletedAcc = await Account.destroy({
    where: { account_id: accountId }
  });
  return deletedAcc > 0;
}

module.exports = {
    verifyAccount: verifyAccount,
    getAccountByUsername: getAccountByUsername,
    createAccount: createAccount,
    getAccountById: getAccountById,
    updateAccount: updateAccount,
    updateAccountPassword: updateAccountPassword,
};