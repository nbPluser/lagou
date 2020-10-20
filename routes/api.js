var express = require("express") ;
var apiControll = require("../controll/api")
var router = express.Router();

router.get("/list",apiControll.getlist)

module.exports = router;