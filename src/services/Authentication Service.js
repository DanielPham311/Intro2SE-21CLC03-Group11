const { Account } = require('../models'); // adjust the path to your models
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

module.exports = {
    verifyAccount: verifyAccount,
    getAccountByUsername: getAccountByUsername
};