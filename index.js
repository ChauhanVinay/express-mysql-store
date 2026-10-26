const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./config/db');


const app = express();
app.use(express.json());

//Route imports
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');

const initDB = async () => {
    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        await db.query(schemaSql);
        console.log('Database table Verified/Created from schema.sql successfully.');
    } catch (error) {
        console.error('Error initializing schema:', error.message);
    }
};

initDB();

//Mount endpoints
app.use('/users', userRoutes);
app.use('/buses', busRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});