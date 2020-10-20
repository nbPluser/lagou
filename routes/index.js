var express = require('express');
var indexController = require("../controll/index")
var router = express.Router();

/* GET home page. */
router.get('/index', function (req, res, next) {
  console.log(req.session.username)
  res.render('index',{
    username:req.session.username
  });
});
router.get('/index/postadd', indexController.index_postadd);
// router.get('/index/postedit', indexController.index_postedit);
router.get('/index/postedit/:page', indexController.index_postedit);
router.get('/index/postupdate/:postId', indexController.index_postupdate);


router.get('/login', indexController.login);
router.get('/loginout', indexController.loginout);
router.get('/register', indexController.register);

module.exports = router;
