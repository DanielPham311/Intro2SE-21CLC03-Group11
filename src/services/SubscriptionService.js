const { Account , User, Admin, SubscriptionPlan, Subscription} = require('../models'); // adjust the path to your models
async function getListUsernames_by_SubscriptionName(subscriptionName) {
    const freeSubscriptionUsers = await Account.findAll({
        attributes: ['username'],
        include: [
            {
                model: User,
                required: true,
                include: [
                    {
                        model: SubscriptionPlan,
                        required: true,
                        include: [
                            {
                                model: Subscription,
                                required: true,
                                where: { subscription_name:  subscriptionName}
                            }
                        ]
                    }
                ]
            }
        ]
    });

    return freeSubscriptionUsers.map(account => account.username);
}

async function getListOfSubscriptions()
{
    try {
        const res = await Subscription.findAll();
        return res.map(res => res.dataValues);
      } catch (error) {
        throw error;
      }
}

async function getUserSubscriptionPlan(userId) {
    try {
      const res = await SubscriptionPlan.findOne({
        where: {
          user_id: userId
        }
      });
      return res.map(res => res.dataValues);
    } catch (error) {
      throw error;
    }
  }

async function updateUserSubscriptionPlan(userId, updatedData) {
    try {
      const subscriptionPlan = await getUserSubscriptionPlan(userId);
      if (!subscriptionPlan) {
        throw new Error('Subscription plan not found');
      }
      return await subscriptionPlan.update(updatedData);
    } catch (error) {
      throw error;
    }
  }

async function deleteUserSubscriptionPlan(userId) {
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


module.exports = {
    getListOfSubscriptions: getListOfSubscriptions,
    getUserSubscriptionPlanByUserId: getUserSubscriptionPlan,
    updateUserSubscriptionPlan: updateUserSubscriptionPlan,
    deleteUserSubscriptionPlan: deleteUserSubscriptionPlan,
    getListUsernames_by_SubscriptionName: getListUsernames_by_SubscriptionName,
};