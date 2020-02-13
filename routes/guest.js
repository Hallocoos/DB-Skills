const express = require('express');
const guestController = require('../controllers/guest');
const router = express.Router();

var multer = require('multer')
var upload = multer({ dest: 'uploads/' });

router.get('/', guestController.getIndex);

router.get('/getAllEmployees', guestController.getAllEmployees);

router.get('/getEmployeeByID/:keys', guestController.getEmployeeByID);

router.get('/getEmployeeSkills/:keys', guestController.getEmployeeSkills);

router.post('/uploadFile', upload.single('file'), guestController.uploadFile);

module.exports = router;