const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
          // define association here
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

            return newAccount;
        }

        static async verifyAccount(c_username, c_password){
            const crypto = require('crypto');
            const hash = crypto.createHash('sha256');
            hash.update(c_password);
            const digest = hash.digest('hex');
            const account = await Account.getAccountByUsername(c_username);
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
            const deletedRowCount = await Account.destroy({
                where: { account_id: accountId }
            });
            return deletedRowCount > 0;
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
        role: DataTypes.STRING(5),
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