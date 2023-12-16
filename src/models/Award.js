const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Award extends Model {
        static associate(models) {
            // define association here
            Award.belongsToMany(models.Movie, { through: models.AwardMovie, foreignKey: 'award_id' });
          }
        // Static method for creating an award
        static async createAward(awardData) {
          try {
            return await Award.create(awardData);
          } catch (error) {
            throw error;
          }
        }
    
        // Static method for getting an award by ID
        static async getAwardById(id) {
          try {
            return await Award.findByPk(id);
          } catch (error) {
            throw error;
          }
        }
    
        // Static method for updating an award
        static async updateAward(id, updatedData) {
          try {
            let award = await Award.findByPk(id);
            if (!award) {
              throw new Error('Award not found');
            }
            return await award.update(updatedData);
          } catch (error) {
            throw error;
          }
        }
    
        // Static method for deleting an award
        static async deleteAward(id) {
          try {
            let award = await Award.findByPk(id);
            if (!award) {
              throw new Error('Award not found');
            }
            return await award.destroy();
          } catch (error) {
            throw error;
          }
        }
      }
    
      Award.init(
        {
          award_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          award_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            charset: 'utf8mb4'
          }
        },
        {
          sequelize,
          modelName: "Award",
          tableName: "Award",
          timestamps: false
        }
      );
    
      return Award;
};