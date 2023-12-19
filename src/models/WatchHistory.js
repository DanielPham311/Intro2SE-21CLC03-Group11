const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WatchHistory extends Model {
    static associate(models) {
      // Define associations here if needed
      WatchHistory.belongsTo(models.User, { foreignKey: 'user' });
      WatchHistory.belongsTo(models.Movie, { foreignKey: 'movie' });
    }
  }

  WatchHistory.init(
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
      time_stamp: {
        type: DataTypes.DATE,
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'WatchHistory',
      tableName: 'WatchHistory',
      timestamps: false
    }
  );

  return WatchHistory;
};
