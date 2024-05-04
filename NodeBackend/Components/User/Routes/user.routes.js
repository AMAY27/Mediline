const express = require('express')
const router = express.Router();
const userController = require('../Controllers/user.controller.js')

router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router