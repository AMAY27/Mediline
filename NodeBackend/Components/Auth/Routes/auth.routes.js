const express = require('express')
const router = express.Router();
const authController = require('../Controllers/auth.controller')

router.post('/auth/login', authController.loginUser)
router.post('/auth/verify', authController.verifyToken)
router.post('/doc/login', authController.loginDoctor)

module.exports = router
