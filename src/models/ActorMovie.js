const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActorMovie extends Model {
    static associate(models) {
      // Define associations here if needed
      ActorMovie.belongsTo(models.Movie, {foreignKey: 'movie_id'});
      ActorMovie.belongsTo(models.Actor, {foreignKey: 'actor_id'});
    }

    static async createActorMovie(actorMovieData) {
      try {
        return await ActorMovie.create(actorMovieData);
      } catch (error) {
        throw error;
      }
    }

    static async getActorMovie(actorId, movieId) {
      try {
        return await ActorMovie.findOne({
          where: { actor: actorId, movie: movieId }
        });
      } catch (error) {
        throw error;
      }
    }

    static async deleteActorMovie(actorId, movieId) {
      try {
        const actorMovie = await ActorMovie.findOne({
          where: { actor: actorId, movie: movieId }
        });
        if (!actorMovie) {
          throw new Error('Actor-Movie association not found');
        }
        return await actorMovie.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  ActorMovie.init(
    {
      actor: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Actor', // Replace with actual model name for the Actor table
          key: 'actor_id'
        }
      },
      movie: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Movie', // Replace with actual model name for the Movie table
          key: 'movie_id'
        }
      },
      role_name: {
        type: DataTypes.STRING(100),
        charset: 'utf8mb4'
      }
    },
    {
      sequelize,
      modelName: 'ActorMovie',
      tableName: 'Actor_Movie',
      timestamps: false
    }
  );

  return ActorMovie;
};
