const express = require('express')
const router = express.Router();
const userController = require('../Controllers/user.controller.js')
const auth = require('../../../middlewares/jwtMiddleware.js')
const validate = require('../middlewares/userValidationMiddleware.js')
const validateUser  = require('../validation/userValidation.js')

// router.post('/signup', userController.registerUser);
// router.post('/login', userController.loginUser);
router.post('/signup', validate(validateUser), userController.registerUser);
router.post('/uploadReport', auth, userController.uploadReport);
router.get('/getReports', auth, userController.getReportsForUser);

module.exports = router