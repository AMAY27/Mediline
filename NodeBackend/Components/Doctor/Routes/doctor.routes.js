const express = require('express')
const router = express.Router();
const doctorController = require('../Controllers/doctor.controller')
const auth = require('../../../middlewares/jwtMiddleware')

router.post('/docsignup', doctorController.registerDoctor);
router.post('/doclogin', doctorController.loginDoctor);
router.post('/docavailability', auth, doctorController.availabilityAddition)
router.get('/fetchavailability', auth, doctorController.fetchDocAvailability)
router.get('/clinicdata', doctorController.fetchClinicData)

module.exports = router