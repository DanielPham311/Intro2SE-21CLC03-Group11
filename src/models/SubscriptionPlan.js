const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SubscriptionPlan extends Model {
        static associate(models) {
          // Define associations if any
          SubscriptionPlan.belongsTo(models.Subscription, {foreignKey: 'subscription_id'});
          SubscriptionPlan.belongsTo(models.User, {foreignKey: 'user_id'});
        }
    
        // CRUD Operations
        static async createSubscriptionPlan(subscriptionPlanData) {
          try {
            return await SubscriptionPlan.create(subscriptionPlanData);
          } catch (error) {
            throw error;
          }
        }
    
        static async getSubscriptionPlanByUserId(userId) {
          try {
            return await SubscriptionPlan.findOne({
              where: {
                user_id: userId
              }
            });
          } catch (error) {
            throw error;
          }
        }
    
        static async updateSubscriptionPlan(userId, updatedData) {
          try {
            const subscriptionPlan = await SubscriptionPlan.getSubscriptionPlanByUserId(userId);
            if (!subscriptionPlan) {
              throw new Error('Subscription plan not found');
            }
            return await subscriptionPlan.update(updatedData);
          } catch (error) {
            throw error;
          }
        }
    
        static async deleteSubscriptionPlan(userId) {
          try {
            const subscriptionPlan = await SubscriptionPlan.getSubscriptionPlanByUserId(userId);
            if (!subscriptionPlan) {
              throw new Error('Subscription plan not found');
            }
            return await subscriptionPlan.destroy();
          } catch (error) {
            throw error;
          }
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