const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AwardActor extends Model {
    static associate(models) {
      // Define associations here if needed
      AwardActor.belongsTo(models.Actor, {foreignKey: 'actor_id'});
      AwardActor.belongsTo(models.Award, {foreignKey: 'award_id'});
    }

    static async createAwardActor(awardActorData) {
      try {
        return await AwardActor.create(awardActorData);
      } catch (error) {
        throw error;
      }
    }

    static async getAwardActor(awardId, actorId, awardDate) {
      try {
        return await AwardActor.findOne({
          where: { award_id: awardId, actor_id: actorId, award_date: awardDate }
        });
      } catch (error) {
        throw error;
      }
    }

    static async deleteAwardActor(awardId, actorId, awardDate) {
      try {
        const awardActor = await AwardActor.findOne({
          where: { award_id: awardId, actor_id: actorId, award_date: awardDate }
        });
        if (!awardActor) {
          throw new Error('Award-Actor association not found');
        }
        return await awardActor.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  AwardActor.init(
    {
      award_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Award', // Replace with actual model name for the Award table
          key: 'award_id'
        }
      },
      actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Actor', // Replace with actual model name for the Actor table
          key: 'actor_id'
        }
      },
      award_date: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'AwardActor',
      tableName: 'Award_Actor',
      timestamps: false
    }
  );

  return AwardActor;
};
