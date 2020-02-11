const express = require('express');
const guestController = require('../controllers/guest');
const router = express.Router();

router.get('/', guestController.getIndex);

router.get('/getEmployees', guestController.getEmployees);

module.exports = router;