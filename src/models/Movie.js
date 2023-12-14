const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      // Define associations here if needed
      Movie.belongsTo(models.Actor, { foreignKey: 'director_id' });
      Movie.belongsToMany(models.Actor, { through: 'ActorMovie' });
      // You can add more associations based on your schema
    }

    static async createMovie(movieData) {
      try {
        return await Movie.create(movieData);
      } catch (error) {
        throw error;
      }
    }

    static async getMovieById(id) {
      try {
        return await Movie.findByPk(id);
      } catch (error) {
        throw error;
      }
    }

    static async updateMovie(id, updatedData) {
      try {
        let movie = await Movie.findByPk(id);
        if (!movie) {
          throw new Error('Movie not found');
        }
        return await movie.update(updatedData);
      } catch (error) {
        throw error;
      }
    }

    static async deleteMovie(id) {
      try {
        let movie = await Movie.findByPk(id);
        if (!movie) {
          throw new Error('Movie not found');
        }
        return await movie.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  Movie.init(
    {
      movie_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4'
      },
      release_date: {
        type: DataTypes.DATE
      },
      rating: {
        type: DataTypes.INTEGER
      },
      overview: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4'
      },
      length: {
        type: DataTypes.INTEGER
      },
      country: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4'
      },
      director_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Director', // Replace with actual model name for the Director table
          key: 'director_id'
        }
      },
      backdrop_path: {
        type: DataTypes.STRING(255)
      },
      poster_path: {
        type: DataTypes.STRING(255)
      },
      isSeries: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[0, 1]]
        }
      },
      video_link: {
        type: DataTypes.STRING(80)
      }
    },
    {
      sequelize,
      modelName: 'Movie',
      tableName: 'Movie',
      timestamps: false
    }
  );

  return Movie;
};
