const { Model } = require('sequelize');
// const SubscriptionPlan = require('./SubscriptionPlan');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Account, { foreignKey: 'user_id' });
            User.hasOne(models.SubscriptionPlan, {foreignKey: 'plan_id'});
        }
        static async createUser(c_account ,c_name, c_birthday, c_parental_mode) {
            // const defaultPlan = await SubscriptionPlan.createSubscriptionPlan(null, null, 1);
            const defaultPlan = await this.associations.SubscriptionPlan.target.createSubscriptionPlan(null, null, 1);
            // Call the stored procedure
            // const result = await sequelize.query('CALL createDefaultSubscriptionPlan()', {
            //     replacements: [c_name, c_age, c_birthday, c_parental_mode],
            //     type: sequelize.QueryTypes.CALL
            // });
            // const plan = result[0][0];

            const now = new Date();
            const dateObject = new Date(c_birthday);
            const c_age = now.getFullYear() - dateObject.getFullYear();
            const newUser = await User.create({
                user_id: c_account,
                name: c_name,
                age: c_age,
                birthday: c_birthday,
                parental_mode: c_parental_mode,
                plan_id: defaultPlan.dataValues.plan_id
            });
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
            try {
                const deletedRowCount = await User.destroy({
                    where: { user_id: userId }
                });
                return deletedRowCount > 0;
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
