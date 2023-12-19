const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // Define associations here if needed
      Admin.belongsTo(models.Account, { foreignKey: 'admin_id' });
    }
  }

  Admin.init(
    {
      admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        charset: 'utf8mb4'
      }
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'Admin',
      timestamps: false
    }
  );

  return Admin;
};
