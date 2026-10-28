const express = require('express');
const sequelize = require('./config/db');
require('./models');

  
//Route imports
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());


//Mount endpoints
app.use('/users', userRoutes);
app.use('/buses', busRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully with all 4 models.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to sync databse:', err.message);
    });
