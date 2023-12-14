const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
      // Define associations here if needed
      Bill.belongsTo(models.User, { foreignKey: 'user_id' });
    }

    static async createBill(billData) {
      try {
        return await Bill.create(billData);
      } catch (error) {
        throw error;
      }
    }

    static async getBillById(id) {
      try {
        return await Bill.findByPk(id);
      } catch (error) {
        throw error;
      }
    }

    static async updateBill(id, updatedData) {
      try {
        let bill = await Bill.findByPk(id);
        if (!bill) {
          throw new Error('Bill not found');
        }
        return await bill.update(updatedData);
      } catch (error) {
        throw error;
      }
    }

    static async deleteBill(id) {
      try {
        let bill = await Bill.findByPk(id);
        if (!bill) {
          throw new Error('Bill not found');
        }
        return await bill.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  Bill.init(
    {
      bill_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: DataTypes.STRING(255)
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2)
      },
      create_date: {
        type: DataTypes.DATE
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User', // Replace with actual model name for the User table
          key: 'user_id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Bill',
      tableName: 'Bill',
      timestamps: false
    }
  );

  return Bill;
};
