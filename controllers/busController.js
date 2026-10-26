const db = require('../config/db');

//POST /buses - Add a new bus
exports.createBus = async (req, res) => {
    try {

   const {busNumber, totalSeats, availableSeats} = req.body;

   const query = 'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)';
   const [result] = await db.execute(query, [busNumber, totalSeats, availableSeats]);

   res.status(201).json({
    message: 'Bus created successfully',
    bus: {id: result.insertId, busNumber, totalSeats, availableSeats}
   });

    } catch(error) {
        console.error('Error creating bus:', error.message);
        res.status(500).json({ error: error.message})
    }
};

// GET /buses/available/:seats - Retrieve all buses with available seatd
exports.getAvailableBuses = async (req, res) => {
    try {

        const minSeats = parseInt(req.params.seats, 10);

        if(isNaN(minSeats)) {
         return res.status(400).json({ error: 'Seat must be valid'});
        }

    const query = 'SELECT * FROM Buses WHERE availableSeats > ?';
    const [buses] = await db.execute(query, [minSeats]); 
    
    res.status(200).json({
      message: `Buses with more than ${minSeats} available seats`,
      count: buses.length,
      data: buses
    });

    } catch (error) {
        console.error('Error fetching available buses:', error.message);
        res.status(500).json({error: error.message});
    }
};

