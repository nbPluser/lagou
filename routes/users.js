var express = require('express');
var userController = require("../controll/user")
var yzm = require("../common/yzm")
var router = express.Router();

/* GET users listing. */
router.post('/login', userController.login);

router.post('/register', userController.register);


router.post('/loginout', userController.loginout);

router.get('/yzm', yzm);

module.exports = router;
