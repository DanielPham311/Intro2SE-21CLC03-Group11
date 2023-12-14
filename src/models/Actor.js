const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    static associate(models) {
      // Define associations here if needed
      Actor.belongsToMany(models.Movie, { through: 'ActorMovie' });
    }

    static async createActor(actorData) {
      try {
        return await Actor.create(actorData);
      } catch (error) {
        throw error;
      }
    }

    static async getActorById(id) {
      try {
        return await Actor.findByPk(id);
      } catch (error) {
        throw error;
      }
    }

    static async updateActor(id, updatedData) {
      try {
        let actor = await Actor.findByPk(id);
        if (!actor) {
          throw new Error('Actor not found');
        }
        return await actor.update(updatedData);
      } catch (error) {
        throw error;
      }
    }

    static async deleteActor(id) {
      try {
        let actor = await Actor.findByPk(id);
        if (!actor) {
          throw new Error('Actor not found');
        }
        return await actor.destroy();
      } catch (error) {
        throw error;
      }
    }
  }

  Actor.init(
    {
      actor_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4'
      },
      birthday: {
        type: DataTypes.DATEONLY
      },
      nationality: {
        type: DataTypes.STRING(100),
        charset: 'utf8mb4'
      },
      age: {
        type: DataTypes.INTEGER,
        get() 
            {
                const now = new Date();
                const birthDate = new Date(this.getDataValue('birthday'));
                const c_age = now.getFullYear() - birthDate.getFullYear();
                return c_age;
            },
        validate: {
          min: 0
        }
      }
    },
    {
      sequelize,
      modelName: 'Actor',
      tableName: 'Actor',
      timestamps: false
    }
  );

  return Actor;
};
