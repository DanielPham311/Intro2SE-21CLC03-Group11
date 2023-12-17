const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      // Define associations here if needed
      // You can add more associations based on your schema
      Movie.belongsToMany(models.Genre, { through: models.GenreMovie, foreignKey: 'movie' });
      Movie.belongsToMany(models.Award, { through: models.AwardMovie, foreignKey: 'movie_id' });
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
      overview: DataTypes.TEXT,
      length: {
        type: DataTypes.INTEGER
      },
      country: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4'
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
