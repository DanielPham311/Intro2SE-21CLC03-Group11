const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GenreMovie extends Model {
    static associate(models) {
      // Define associations here if needed
      GenreMovie.belongsTo(models.Genre, {foreignKey: 'genre'});
      GenreMovie.belongsTo(models.Movie, {foreignKey: 'movie'});
    }

    static async createGenreMovie(genreMovieData) {
      try {
        return await GenreMovie.create(genreMovieData);
      } catch (error) {
        throw error;
      }
    }

    static async getGenreMovie(genreId, movieId) {
      try {
        return await GenreMovie.findOne({
          where: { genre: genreId, movie: movieId }
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
        allowNull: false,
        references: {
          model: 'Genre', // Replace with actual model name for the Genre table
          key: 'genre_id'
        }
      },
      movie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Movie', // Replace with actual model name for the Movie table
          key: 'movie_id'
        }
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
