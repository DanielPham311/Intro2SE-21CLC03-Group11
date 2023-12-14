const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WatchList extends Model {
    static associate(models) {
      // Define associations here if needed
      WatchList.belongsTo(models.User, { foreignKey: 'user' });
      WatchList.belongsTo(models.Movie, { foreignKey: 'movie' });
    }

    static async createWatchList(watchListData) {
      try {
        return await WatchList.create(watchListData);
      } catch (error) {
        throw error;
      }
    }

    static async getWatchList(user, movie, orderNumber) {
      try {
        return await WatchList.findOne({
          where: { user: user, movie: movie, order_number: orderNumber }
        });
      } catch (error) {
        throw error;
      }
    }

    static async deleteWatchList(user, movie, orderNumber) {
      try {
        const watchList = await WatchList.findOne({
          where: { user: user, movie: movie, order_number: orderNumber }
        });
        if (!watchList) {
          throw new Error('WatchList association not found');
        }
        return await watchList.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  WatchList.init(
    {
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // Replace with actual model name for the User table
          key: 'user_id'
        }
      },
      movie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Movie', // Replace with actual model name for the Movie table
          key: 'movie_id'
        }
      },
      order_number: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'WatchList',
      tableName: 'WatchList',
      timestamps: false
    }
  );

  return WatchList;
};
