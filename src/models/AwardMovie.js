const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AwardMovie extends Model {
    static associate(models) {
      // Define associations here if needed
      // AwardMovie.belongsTo(models.Movie, {foreignKey: 'movie_id'});
      // AwardMovie.belongsTo(models.Award, {foreignKey: 'award_id'});
    }

    static async createAwardMovie(awardMovieData) {
      try {
        return await AwardMovie.create(awardMovieData);
      } catch (error) {
        throw error;
      }
    }

    static async getAwardMovie(awardId, movieId, awardDate) {
      try {
        return await AwardMovie.findOne({
          where: { award_id: awardId, movie_id: movieId, award_date: awardDate }
        });
      } catch (error) {
        throw error;
      }
    }

    static async deleteAwardMovie(awardId, movieId, awardDate) {
      try {
        const awardMovie = await AwardMovie.findOne({
          where: { award_id: awardId, movie_id: movieId, award_date: awardDate }
        });
        if (!awardMovie) {
          throw new Error('Award-Movie association not found');
        }
        return await awardMovie.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  AwardMovie.init(
    {
      award_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Award', // Replace with actual model name for the Award table
          key: 'award_id'
        }
      },
      movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Movie', // Replace with actual model name for the Movie table
          key: 'movie_id'
        }
      },
      award_date: {
        type: DataTypes.DATE,
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'AwardMovie',
      tableName: 'Award_Movie',
      timestamps: false
    }
  );

  return AwardMovie;
};
