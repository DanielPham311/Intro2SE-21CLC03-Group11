const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      // Define associations here if needed
      Genre.belongsToMany(models.Movie, { through: 'GenreMovie' });
    }

    static async createGenre(genreData) {
      try {
        return await Genre.create(genreData);
      } catch (error) {
        throw error;
      }
    }

    static async getGenreById(id) {
      try {
        return await Genre.findByPk(id);
      } catch (error) {
        throw error;
      }
    }

    static async updateGenre(id, updatedData) {
      try {
        let genre = await Genre.findByPk(id);
        if (!genre) {
          throw new Error('Genre not found');
        }
        return await genre.update(updatedData);
      } catch (error) {
        throw error;
      }
    }

    static async deleteGenre(id) {
      try {
        let genre = await Genre.findByPk(id);
        if (!genre) {
          throw new Error('Genre not found');
        }
        return await genre.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  Genre.init(
    {
      genre_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      genre_name: {
        type: DataTypes.STRING(100),
        charset: 'utf8mb4'
      }
    },
    {
      sequelize,
      modelName: 'Genre',
      tableName: 'Genre',
      timestamps: false
    }
  );

  return Genre;
};
