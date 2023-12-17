const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
      static associate(models) {
        // define association here
        Account.hasOne(models.User, { foreignKey: 'user_id',onDelete: 'CASCADE' ,hooks: true}); // cascade not working dont know why
        Account.hasOne(models.Admin, { foreignKey: 'admin_id',onDelete: 'CASCADE' , hooks: true});
      }
      // CREATE operation, role: 'admin','user','staff'
      static async createAccount(c_username, c_password, c_role, c_email) {
          const crypto = require('crypto');
          const hash = crypto.createHash('sha256');
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
            const newUser = await this.associations.User.target.createUser({
              user_id : newAccount.dataValues.account_id
            });
          }
          else if (c_role == 'admin')
          {
            // insert into Admin table
            const newAdmin = await this.associations.Admin.target.createAdmin(newAccount.dataValues.account_id, '');
          }
          return newAccount;
      }
      static async verifyAccount(c_username, c_password){
          const crypto = require('crypto');
          const hash = crypto.createHash('sha256');
          hash.update(c_password);
          const digest = hash.digest('hex');
          const account = await Account.getAccountByUsername(c_username);
          // console.log(account);
          if (account == null) return false;
          return (digest == account.dataValues.password);
      }
      // READ operation (Retrieve all accounts)
      static async getAllAccounts() {
          const allAccounts = await Account.findAll();
          return allAccounts;
      }
      static async getAccountByUsername(username) {
          const account = await Account.findOne({
              where: {
                  username: username
              }
          });
          return account;
      }
      // FIND by username
      static async getAccountById(accountId) {
          const account = await Account.findByPk(accountId);
          return account;
      }
      // UPDATE operation
      static async updateAccount(accountId, newData) {
          const [updatedRowsCount] = await Account.update(newData, {
              where: { account_id: accountId }
          });
          return updatedRowsCount > 0;
      }
      static async updateAccountPassword(accountId, newPassword) {
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
      static async deleteAccount(accountId) {
          let deletedAcc = await Account.getAccountById(accountId);
          if (deletedAcc == null) 
          {
            console.log("No account with this ID is found");
            return;
          }
          if (deletedAcc.dataValues.role == 'user')
          {
            const deleteUser = await this.associations.User.target.deleteUser(deletedAcc.dataValues.account_id);
          }
          else if (deletedAcc.dataValues.role == 'admin')
          {
            const deleteUser = await this.associations.Admin.target.deleteAdmin(deletedAcc.dataValues.account_id);
          }
          deletedAcc = await Account.destroy({
            where: { account_id: accountId }
          });
          return deletedAcc > 0;
      }
    }
    Account.init({
      account_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(255),
        unique: true
      },
      password: {
        type: DataTypes.CHAR(64),
        allowNull: false
      },
      create_date: DataTypes.DATE,
      role: {
        type: DataTypes.STRING(5),
        validate: {
          isIn: [['admin', 'user', 'staff']]
        }
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true
      }
    }, {
      sequelize,
      modelName: "Account",
      tableName: "Account",
      createdAt: 'create_date',
      updatedAt: false,
      timestamps: true
    });

    return Account;
};