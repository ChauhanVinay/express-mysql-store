const User = require('./User');
const Bus = require('./Bus');
const Booking  = require('./Booking');


// 1. Link Users & Bookings (One-to-Many)
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 2. Link Buses & Bookings (One-to-Many)
Bus.hasMany(Booking, { foreignKey: 'busId', onDelete: 'CASCADE' });
Booking.belongsTo(Bus, {foreignKey: 'busId', as: 'bus'});

module.exports = {
    User,
    Bus,
    Booking
};