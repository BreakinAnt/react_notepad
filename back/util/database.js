const Sequelize = require('sequelize');
const cfg = require('./cfg.json');

const sequelize = new Sequelize(cfg.databaseName, cfg.databaseUser, cfg.databasePassword, {
    dialect: 'mysql',
    host: cfg.databaseHost,
    port: cfg.databasePort
});

module.exports = sequelize;