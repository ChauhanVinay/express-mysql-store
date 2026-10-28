const { Booking, User, Bus } = require('../models');

//POST /bookings
exports.createBooking = async (req, res) => {
    try {
        const { userId, busId, seatNumber } = req.body;

        if (!userId || !busId || !seatNumber) {
  return res.status(400).json({ error: 'userId, busId, and seatNumber are required.' });
    }
   
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: `User with ID ${userId} not found.` });
    }

    const bus  = await Bus.findByPk(busId);
    if (!bus) {
      return res.status(404).json({ error: `Bus with ID ${busId} not found.` });
    }

    const booking = await Booking.create({ userId, busId, seatNumber});
    res.status(201).json(booking);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}