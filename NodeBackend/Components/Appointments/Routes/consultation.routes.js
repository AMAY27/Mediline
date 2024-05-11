const express = require('express');
const router = express.Router();
const consultations = require('../Controllers/consultation.controller')

router.get('/test', consultations.checkAvailability )
router.post('/consultation/bookappointment', consultations.addAppointment)
module.exports = router