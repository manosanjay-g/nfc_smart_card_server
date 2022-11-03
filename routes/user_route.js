const express = require('express')
const router = express.Router();
const { getUpcomingAppointments, getRecentVisits, getDoctorUpcomingAppointments } = require('../controllers/userController.js');

router.get("/patient/appointments", getUpcomingAppointments)
router.get("/doctor/appointments", getDoctorUpcomingAppointments)
router.get("/patient/recentvisits", getRecentVisits)

module.exports = router