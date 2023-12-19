const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GenreMovie extends Model {
    static associate(models) {
      // Define associations here if needed
      // GenreMovie.belongsTo(models.Genre, { foreignKey: 'genre_id' });
      // GenreMovie.belongsTo(models.Movie, { foreignKey: 'movie_id' });
    }

    static async createGenreMovie(genreMovieData) {
      try {
        return await GenreMovie.create(genreMovieData);
      } catch (error) {
        throw error;
      }
    }

    static async getGenreOfMovie(movieId) {
      try {
        return await GenreMovie.findAll({
          where: { movie: movieId }
        });
      } catch (error) {
        throw error;
      }
    }

    static async deleteGenreMovie(genreId, movieId) {
      try {
        const genreMovie = await GenreMovie.findOne({
          where: { genre: genreId, movie: movieId }
        });
        if (!genreMovie) {
          throw new Error('Genre-Movie association not found');
        }
        return await genreMovie.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  GenreMovie.init(
    {
      genre: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      movie: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'GenreMovie',
      tableName: 'Genre_Movie',
      timestamps: false
    }
  );

  return GenreMovie;
};
