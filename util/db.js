const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop', 'root', '12457800', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;