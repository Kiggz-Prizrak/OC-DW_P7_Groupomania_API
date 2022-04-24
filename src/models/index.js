// connexion sequalize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('groupomania', 'phpmyadmin', 'phpmyadmin', { //TODO un .env
  host: 'localhost',
  dialect: 'mysql',
});

const user = require('./User')(sequelize, Sequelize.DataTypes);

sequelize.User = user;

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
