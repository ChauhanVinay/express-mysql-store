const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Bus = sequelize.define('Bus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    busNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },  
    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    timestamps: false  
});

module.exports = Bus;