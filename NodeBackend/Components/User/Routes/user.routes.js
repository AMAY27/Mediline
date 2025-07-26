const express = require('express')
const router = express.Router();
const userController = require('../Controllers/user.controller.js')
const auth = require('../../../middlewares/jwtMiddleware.js')

// router.post('/signup', userController.registerUser);
// router.post('/login', userController.loginUser);
router.post('/user/signup', userController.registerUser);
router.post('/user/uploadReport', auth, userController.uploadReport);
router.get('/user/getReports', auth, userController.getReportsForUser);
router.get('/user/checkEmailAvailable' , userController.checkUserEmailExist);
router.get('/user/checkContactAvailable', userController.checkUserContactExist);

module.exports = router