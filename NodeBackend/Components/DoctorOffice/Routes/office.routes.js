const express = require('express')
const router = express.Router()
const officeController = require('../Controllers/office.controller')
const jwtmiddleware = require('../../../middlewares/jwtMiddleware')

router.post('/officeregister',jwtmiddleware.verification, officeController.registerOffice)

module.exports = router