const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Account, { foreignKey: 'user_id' });
            User.hasOne(models.SubscriptionPlan, {foreignKey: 'user_id'});
        }
        static async createUser(UserData) {
            const newUser = await User.create(UserData);
            // first user account to be created will be create with Free Subscription Plan, they can upgrade later
            const defaultPlan = await this.associations.SubscriptionPlan.target.createSubscriptionPlan(
                {
                    user_id: newUser.dataValues.user_id,
                    subscription_id: 1
                }
            );
            return newUser;
        }

        static async getAllUsers() {
            try {
                const allUsers = await User.findAll();
                return allUsers;
            } catch (error) {
                throw new Error(`Error retrieving users: ${error.message}`);
            }
        }

        static async getUserById(userId) {
            try {
                const user = await User.findByPk(userId);
                return user;
            } catch (error) {
                throw new Error(`Error retrieving user by ID: ${error.message}`);
            }
        }

        static async updateUser(userId, newData) {
            try {
                const [updatedRowsCount] = await User.update(newData, {
                    where: { user_id: userId }
                });
                return updatedRowsCount > 0;
            } catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        }

        static async deleteUser(userId) {
            let deletedUser = await User.getUserById(userId);
            if (deletedUser == null) 
            {
                console.log("No user found");
                return;
            }
            const plan = await User.associations.SubscriptionPlan.target.deleteSubscriptionPlan(userId);
            try {
                deletedUser = await User.destroy({
                    where: { user_id: userId }
                });
                return deletedUser > 0;
            } catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
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
        age: 
        {
            type: DataTypes.INTEGER,
            get() 
            {
                const now = new Date();
                const birthDate = new Date(this.getDataValue('birthday'));
                const c_age = now.getFullYear() - birthDate.getFullYear();
                return c_age;
            }
        },
        birthday: DataTypes.DATE,
        parental_mode: 
        {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: "User",
        tableName: "User",
        timestamps: false
    });

    return User;
};
