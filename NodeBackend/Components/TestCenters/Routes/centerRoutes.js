const express = require('express');
const router = express.Router();
const centerController = require('../Controllers/centerController');
// const authMiddleWare = require('../../../middlewares/jwtMiddleware')

router.post('/registercenter', centerController.registerCenter);
router.get('/centers', centerController.getCenters);
router.get('/testcenter', centerController.getCenterData);
router.post('/appointment/book',  centerController.bookappointment);
router.post('/logincenter', centerController.loginCenter);

module.exports = router;