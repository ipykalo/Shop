const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Order;