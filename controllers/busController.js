const { Op } = require('sequelize');
const { Bus, Booking, User } = require('../models');

//POST /buses - Insert bus using Sequelize create()
exports.createBus = async (req, res) => {
    try {

   const {busNumber, totalSeats, availableSeats} = req.body;
   if (!busNumber || totalSeats == undefined || availableSeats == undefined) {
    return res.status(400).json({error: 'busNumber, totalSeats, and availableSeats are required'});
   }

   const newBus = await Bus.create({ busNumber, totalSeats, availableSeats});

   res.status(201).json({
    message: 'Bus created successfully',
    data: newBus
   });

    } catch(error) {
        res.status(500).json({ error: error.message})
    }
};

// GET /buses/available/:seats - Retrieve all buses with available seat > :seats
exports.getAvailableBuses = async (req, res) => {
    try {

        const minSeats = parseInt(req.params.seats, 10);

        if(isNaN(minSeats)) {
         return res.status(400).json({ error: 'Seat must be valid'});
        }

      const buses = await Bus.findAll({
        where: {
            availableSeats: {
                [Op.gt]: minSeats
            }   
        }
      });

    res.status(200).json({
      count: buses.length,
      data: buses
    });

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// GET /buses/:id/bookings - Bookings for a bus including user details
exports.getBusBooking = async (req, res) => {
    try {
          const  { id } = req.params;
          const bookings = await Booking.findAll({
            where: { busId: id },
            attributes: ['id', 'seatNumber'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email']
                }
            ]
          });

          res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}