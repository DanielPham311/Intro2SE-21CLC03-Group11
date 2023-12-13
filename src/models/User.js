const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
          // define association here
        }
      }
      User.init({
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(255),
          charset: 'utf8mb4'
        },
        age: DataTypes.INTEGER,
        birthday: DataTypes.DATE,
        parental_mode: DataTypes.INTEGER,
        plan_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      }, {
        sequelize,
        modelName: "User",
        tableName: "User",
        timestamps: false
      });
      
    return User;
};