const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CreditCard extends Model {
    static associate(models) {
      // Define associations here if needed
      CreditCard.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  CreditCard.init(
    {
      card_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      card_number: {
        type: DataTypes.CHAR(16),
        allowNull: false,
        unique: true
      },
      cvv: {
        type: DataTypes.CHAR(3)
      },
      valid_thru: {
        type: DataTypes.CHAR(5)
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User', // Replace with actual model name for the User table
          key: 'user_id'
        }
      },
      card_provider: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'CreditCard',
      tableName: 'credit_card',
      timestamps: false
    }
  );

  return CreditCard;
};