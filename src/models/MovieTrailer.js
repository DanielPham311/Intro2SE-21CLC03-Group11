const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieTrailer extends Model {
    static associate(models) {
      // Define associations here if needed
      MovieTrailer.belongsTo(models.Movie, { foreignKey: 'movie' });
    }
  }

  MovieTrailer.init(
    {
      movie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Movie', // Replace with actual model name for the Movie table
          key: 'movie_id'
        }
      },
      trailer_link: {
        type: DataTypes.STRING(255),
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'MovieTrailer',
      tableName: 'MovieTrailer',
      timestamps: false
    }
  );

  return MovieTrailer;
};
