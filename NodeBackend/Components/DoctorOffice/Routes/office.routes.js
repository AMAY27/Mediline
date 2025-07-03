const express = require('express')
const router = express.Router()
const officeController = require('../Controllers/office.controller')
const auth = require('../../../middlewares/jwtMiddleware');

router.post('/officeregister', auth, officeController.registerOffice)
//router.put('/office/docavailability', officeController.availabilityAddition)
router.get('/office/fetchAllOffice', auth, officeController.fetchAllOffices)

module.exports = router