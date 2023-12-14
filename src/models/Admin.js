const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // Define associations here if needed
      Admin.belongsTo(models.Account, { foreignKey: 'admin_id' });
    }
    // example: createAdmin({admin_id: 1, name: 'Dinh Quang Phong'})
    static async createAdmin(adminData) {
      try {
        return await Admin.create(adminData);
      } catch (error) {
        throw error;
      }
    }

    static async getAdminById(id) {
      try {
        return await Admin.findByPk(id);
      } catch (error) {
        throw error;
      }
    }

    static async updateAdmin(id, updatedData) {
      try {
        let admin = await Admin.findByPk(id);
        if (!admin) {
          throw new Error('Admin not found');
        }
        return await admin.update(updatedData);
      } catch (error) {
        throw error;
      }
    }

    static async deleteAdmin(id) {
      try {
        let admin = await Admin.findByPk(id);
        if (!admin) {
          throw new Error('Admin not found');
        }
        return await admin.destroy();
      } catch (error) {
        throw error;
      }
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
