const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false  
});

module.exports = Booking;