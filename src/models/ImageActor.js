const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ImageActor extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example: ImageActor.belongsTo(models.Actor, { foreignKey: 'actor' });
    }

    static async createImageActor(imageActorData) {
      try {
        return await ImageActor.create(imageActorData);
      } catch (error) {
        throw error;
      }
    }

    static async getImageActor(actorId, imageLink) {
      try {
        return await ImageActor.findOne({
          where: { actor: actorId, image_link: imageLink }
        });
      } catch (error) {
        throw error;
      }
    }

    static async deleteImageActor(actorId, imageLink) {
      try {
        const imageActor = await ImageActor.findOne({
          where: { actor: actorId, image_link: imageLink }
        });
        if (!imageActor) {
          throw new Error('Image-Actor association not found');
        }
        return await imageActor.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  ImageActor.init(
    {
      actor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Actor', // Replace with actual model name for the Actor table
          key: 'actor_id'
        }
      },
      image_link: {
        type: DataTypes.STRING(255)
      }
    },
    {
      sequelize,
      modelName: 'ImageActor',
      tableName: 'Image_actor',
      timestamps: false
    }
  );

  return ImageActor;
};
