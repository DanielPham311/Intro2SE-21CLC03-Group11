const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subscription extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    Subscription.init(
      {
        subscription_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        subscription_name: {
          type: DataTypes.STRING(10),
          unique: true,
          allowNull: false
        },
        price_per_month: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: false
        },
        resolution_cap: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: "Subscription",
        tableName: "Subscription", // specify the table name
        timestamps: false // if your table doesn't have createdAt and updatedAt fields
      }
    );
    return Subscription;
};