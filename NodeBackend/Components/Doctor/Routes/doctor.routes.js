const express = require('express')
const router = express.Router();
const doctorController = require('../Controllers/doctor.controller')

router.post('/docsignup', doctorController.registerDoctor);
router.post('/doclogin', doctorController.loginDoctor);
router.post('/docavailability', doctorController.availabilityAddition)
router.get('/fetchavailability', doctorController.fetchDocAvailability)

module.exports = router