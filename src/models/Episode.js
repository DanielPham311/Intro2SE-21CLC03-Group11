const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    static associate(models) {
      // Define associations here if needed
      Episode.belongsTo(models.Season, { foreignKey: 'season' });
      // You can add more associations based on your schema
    }

    static async createEpisode(episodeData) {
      try {
        return await Episode.create(episodeData);
      } catch (error) {
        throw error;
      }
    }

    static async getEpisodeById(id) {
      try {
        return await Episode.findByPk(id);
      } catch (error) {
        throw error;
      }
    }

    static async updateEpisode(id, updatedData) {
      try {
        let episode = await Episode.findByPk(id);
        if (!episode) {
          throw new Error('Episode not found');
        }
        return await episode.update(updatedData);
      } catch (error) {
        throw error;
      }
    }

    static async deleteEpisode(id) {
      try {
        let episode = await Episode.findByPk(id);
        if (!episode) {
          throw new Error('Episode not found');
        }
        return await episode.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  Episode.init(
    {
      episode_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4'
      },
      overview: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4'
      },
      length: {
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.INTEGER
      },
      season: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Season', // Replace with actual model name for the Season table
          key: 'season_id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Episode',
      tableName: 'Episode',
      timestamps: false
    }
  );

  return Episode;
};
