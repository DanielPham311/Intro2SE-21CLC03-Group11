const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieTrailer extends Model {
    static associate(models) {
      // Define associations here if needed
      MovieTrailer.belongsTo(models.Movie, { foreignKey: 'movie' });
    }

    static async createMovieTrailer(movieTrailerData) {
      try {
        return await MovieTrailer.create(movieTrailerData);
      } catch (error) {
        throw error;
      }
    }

    static async getMovieTrailer(movieId) {
      try {
        return await MovieTrailer.findAll({
          where: { movie: movieId}
        });
      } catch (error) {
        throw error;
      }
    }

    static async deleteMovieTrailer(movieId, trailerLink) {
      try {
        const movieTrailer = await MovieTrailer.findOne({
          where: { movie: movieId, trailer_link: trailerLink }
        });
        if (!movieTrailer) {
          throw new Error('MovieTrailer association not found');
        }
        return await movieTrailer.destroy();
      } catch (error) {
        throw error;
      }
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
