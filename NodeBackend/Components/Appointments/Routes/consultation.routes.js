const express = require('express');
const router = express.Router();
const consultations = require('../Controllers/consultation.controller')

router.get('/test', consultations.checkAvailability )

module.exports = router