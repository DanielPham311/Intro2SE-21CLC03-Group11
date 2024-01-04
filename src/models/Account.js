const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
      static associate(models) {
        // define association here
        Account.hasOne(models.User, { foreignKey: 'user_id',onDelete: 'CASCADE' ,hooks: true});
        Account.hasOne(models.Admin, { foreignKey: 'admin_id',onDelete: 'CASCADE' , hooks: true});
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
        type: DataTypes.CHAR(64)
      },
      create_date: DataTypes.DATE,
      role: {
        type: DataTypes.STRING(5),
        allowNull: false,
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