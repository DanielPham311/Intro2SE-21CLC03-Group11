const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SubscriptionPlan extends Model {
        static associate(models) {
            // Define associations if any
        }
        static async createSubscriptionPlan(c_start_date, c_expired_date, c_subscription_id) {
            try {
                const newSubscriptionPlan = await SubscriptionPlan.create({
                    start_date: c_start_date,
                    expired_date: c_expired_date,
                    subscription_id: c_subscription_id
                });
                return newSubscriptionPlan;
            } catch (error) {
                throw new Error(`Error creating subscription plan: ${error.message}`);
            }
        }

        static async getAllSubscriptionPlans() {
            try {
                const allSubscriptionPlans = await SubscriptionPlan.findAll();
                return allSubscriptionPlans;
            } catch (error) {
                throw new Error(`Error retrieving subscription plans: ${error.message}`);
            }
        }

        static async getSubscriptionPlanById(planId) {
            try {
                const subscriptionPlan = await SubscriptionPlan.findByPk(planId);
                return subscriptionPlan;
            } catch (error) {
                throw new Error(`Error retrieving subscription plan by ID: ${error.message}`);
            }
        }

        static async updateSubscriptionPlan(planId, newData) {
            try {
                const [updatedRowsCount] = await SubscriptionPlan.update(newData, {
                    where: { plan_id: planId }
                });
                return updatedRowsCount > 0;
            } catch (error) {
                throw new Error(`Error updating subscription plan: ${error.message}`);
            }
        }

        static async deleteSubscriptionPlan(planId) {
            try {
                const deletedRowCount = await SubscriptionPlan.destroy({
                    where: { plan_id: planId }
                });
                return deletedRowCount > 0;
            } catch (error) {
                throw new Error(`Error deleting subscription plan: ${error.message}`);
            }
        }
    }

    SubscriptionPlan.init({
        plan_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start_date: DataTypes.DATE,
        expired_date: DataTypes.DATE,
        subscription_id: DataTypes.INTEGER
        // Define other attributes as needed
    }, {
        sequelize,
        modelName: "SubscriptionPlan",
        tableName: "Subscription_plan",
        timestamps: false
    });

    return SubscriptionPlan;
};