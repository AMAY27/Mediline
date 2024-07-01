const express = require('express')
const router = express.Router()
const officeController = require('../Controllers/office.controller')
const jwtmiddleware = require('../../../middlewares/jwtMiddleware')

router.post('/officeregister', officeController.registerOffice)
//router.put('/office/docavailability', officeController.availabilityAddition)
router.get('/office/fetchAllOffice', officeController.fetchAllOffices)

module.exports = router