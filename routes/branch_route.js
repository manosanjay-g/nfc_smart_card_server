const express = require('express')
const router = express.Router();
const { addAppointment } = require('../controllers/branchController.js');

router.get("/add/appointments", addAppointment)


module.exports = router