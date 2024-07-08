const express = require('express');
const router = express.Router();
const consultations = require('../Controllers/consultation.controller')
const auth = require('../../../middlewares/jwtMiddleware')

router.get('/test', auth,consultations.checkAvailability )
router.post('/consultation/bookappointment', auth,consultations.addAppointment)
router.get('/detailsForBooking', auth,consultations.getDetailsForBookingAppointment)
module.exports = router