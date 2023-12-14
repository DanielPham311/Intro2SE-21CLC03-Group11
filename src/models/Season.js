const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    static associate(models) {
      // Define associations here if needed
      Season.belongsTo(models.Movie, { foreignKey: 'movie' });
      // You can add more associations based on your schema
    }

    static async createSeason(seasonData) {
      try {
        return await Season.create(seasonData);
      } catch (error) {
        throw error;
      }
    }

    static async getSeasonById(id) {
      try {
        return await Season.findByPk(id);
      } catch (error) {
        throw error;
      }
    }

    static async updateSeason(id, updatedData) {
      try {
        let season = await Season.findByPk(id);
        if (!season) {
          throw new Error('Season not found');
        }
        return await season.update(updatedData);
      } catch (error) {
        throw error;
      }
    }

    static async deleteSeason(id) {
      try {
        let season = await Season.findByPk(id);
        if (!season) {
          throw new Error('Season not found');
        }
        return await season.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  Season.init(
    {
      season_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4'
      },
      air_date: {
        type: DataTypes.DATE
      },
      season_number: {
        type: DataTypes.INTEGER
      },
      average_rating: {
        type: DataTypes.INTEGER
      },
      poster_path: {
        type: DataTypes.STRING(255)
      },
      movie: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Movie', // Replace with actual model name for the Movie table
          key: 'movie_id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Season',
      tableName: 'Season',
      timestamps: false
    }
  );

  return Season;
};
