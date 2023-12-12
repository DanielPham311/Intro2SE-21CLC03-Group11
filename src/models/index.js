const config = require('../config/config.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: config.development.dialect,
    }
  );

// sequelize.authenticate().then(() => {
//    console.log('Connection has been established successfully.');
// }).catch((error) => {
//    console.error('Unable to connect to the database: ', error);
// });

const db = {}
db.sequelize = sequelize;
db.models = {}
db.models.Subscription = require('./Subscription')(sequelize, Sequelize.DataTypes);
module.exports = db;