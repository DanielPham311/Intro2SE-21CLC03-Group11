const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SubscriptionPlan extends Model {
        static associate(models) {
          // Define associations if any
          SubscriptionPlan.belongsTo(models.Subscription, {foreignKey: 'subscription_id'});
          SubscriptionPlan.belongsTo(models.User, {foreignKey: 'user_id'});
        }
      }
    
      SubscriptionPlan.init(
        {
          user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
              model: 'User',
              key: 'user_id'
            }
          },
          subscription_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          start_date: {
            type: DataTypes.DATE
          },
          expired_date: {
            type: DataTypes.DATE
          }
        },
        {
          sequelize,
          modelName: 'SubscriptionPlan',
          tableName: 'Subscription_plan',
          createdAt: 'start_date',
          updatedAt: false,
          timestamps: true
        }
      );

    return SubscriptionPlan;
};