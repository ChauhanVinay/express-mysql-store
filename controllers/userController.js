const db = require('../config/db');

//POST /users - Add a new user
exports.createUser = async (req, res) => {
    try {
      const {name, email} = req.body;

      if(!name || !email){
    return res.status(400).json({ error: 'Name and email required'});
      }

   const query = 'INSERT INTO Users (name, email) VALUE (?, ?)';
   const [result] = await db.execute(query, [name, email]); 
   
   res.status(201).json({
    message: "User created successfully",
    user: { id: result.insertId, name, email }
   });
      
    } catch(error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: error.message});
    }
};

// GET /users - Retrieve all users
exports.getAllUsers = async (req, res) => {
    try {
        
        const query = 'SELECT * FROM Users';
        const [users] = await db.query(query);

        res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });
    } catch(error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: error.message});
    }
};