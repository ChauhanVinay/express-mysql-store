const express = require('express');
const router = express.Router();

const busController = require('../controllers/busController');

router.post('/', busController.createBus);
router.get('/available/:seats', busController.getAvailableBuses);

module.exports = router;