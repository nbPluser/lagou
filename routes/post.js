var express = require("express");
var router = express.Router() ;
var postController = require("../controll/post")
var multer = require('multer'); 
var upload = multer({ dest: './public/uploads/' });
 
router.post('/add',upload.single('companyLogo'),postController.add)
router.post('/update',upload.single('companyLogo'),postController.update)
router.get('/postdelete/:postId', postController.deleter);
module.exports = router ;