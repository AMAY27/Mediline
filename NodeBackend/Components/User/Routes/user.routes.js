const express = require('express')
const router = express.Router();
const userController = require('../Controllers/user.controller.js')

router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/uploadReport', userController.uploadReport);
router.get('/getReports', userController.getReportsForUser);

module.exports = router