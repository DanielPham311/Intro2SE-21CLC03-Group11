const { Account, User, SubscriptionPlan, Subscription } = require('../models'); // adjust the path to your models

async function getFreeSubscriptionUsernames() {
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
                                where: { subscription_name: 'Free' }
                            }
                        ]
                    }
                ]
            }
        ]
    });

    return freeSubscriptionUsers.map(account => account.username);
}

module.exports = {
    getFreeSubscriptionUsernames: getFreeSubscriptionUsernames
};