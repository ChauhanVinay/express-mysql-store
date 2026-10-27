const User = require('../models/User');

//POST /users - Insert user using Sequelize create()
exports.createUser = async (req, res) => {
    try {
      const {name, email} = req.body;
      if(!name || !email){
    return res.status(400).json({ error: 'Name and email required'});
      }

  const newUser = await User.create({ name, email });
    res.status(201).json({
    message: "User created successfully",
    data: newUser
   });
      
    } catch(error) {
        res.status(500).json({ error: error.message});
    }
};

// GET /users - Fetch all users using findAll()
exports.getAllUsers = async (req, res) => {
    try {
    const users = await User.findAll();
     res.status(200).json({ data: users });
    } catch(error) {
        res.status(500).json({ error: error.message});
    }
};