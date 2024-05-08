const express = require('express')
const router = express.Router();
const doctorController = require('../Controllers/doctor.controller')

router.post('/docsignup', doctorController.registerDoctor);
router.post('/doclogin', doctorController.loginDoctor);
router.post('/docavailability', doctorController.availabilityAddition)

module.exports = router