const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const CartProduct = sequelize.define('cartProduct', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    }
});

module.exports = CartProduct;