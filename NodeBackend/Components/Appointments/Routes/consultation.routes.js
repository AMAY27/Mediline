const express = require('express');
const router = express.Router();
const consultations = require('../Controllers/consultation.controller')

router.get('/test', consultations.checkAvailability )
router.post('/consultation/bookappointment', consultations.addAppointment)
router.get('/detailsForBooking', consultations.getDetailsForBookingAppointment)
module.exports = router