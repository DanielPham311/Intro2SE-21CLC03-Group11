const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // Define associations here if needed
      Comment.belongsTo(models.User, { foreignKey: 'user' });
      Comment.belongsTo(models.Movie, { foreignKey: 'movie' });
    }

    static async createComment(commentData) {
      try {
        return await Comment.create(commentData);
      } catch (error) {
        throw error;
      }
    }

    static async getComment(user, movie, timeStamp) {
      try {
        return await Comment.findOne({
          where: { user: user, movie: movie, time_stamp: timeStamp }
        });
      } catch (error) {
        throw error;
      }
    }

    static async deleteComment(user, movie, timeStamp) {
      try {
        const comment = await Comment.findOne({
          where: { user: user, movie: movie, time_stamp: timeStamp }
        });
        if (!comment) {
          throw new Error('Comment association not found');
        }
        return await comment.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  Comment.init(
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
      },
      content: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'Comment',
      timestamps: false
    }
  );

  return Comment;
};
