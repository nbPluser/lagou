var model = require("../model/model")
// var getyzm = require("../common/yzm");
var crypot = require("../common/crypto")
var login = async (req, res, next) => {
    var { username, password, yzm } = req.body;
    if (yzm.toLowerCase() != req.session.captcha.toLowerCase()) {
        res.send('<script>alert("验证码输入有误"); location.href="/login"; </script>');
        return;
    }

    var info = await model.findOne({
        username,
        password: crypot(password)
    });
    if (info) {

        //写入session值，可以知道是哪个用户
        req.session.username = username;

        res.send('<script>alert("登录成功！"); location.href="/index"; </script>');
    }
    else {
        res.send('<script>alert("登录失败！"); location.href="/login"; </script>');
    }
}

var register = async (req, res, next) => {
    var { username, password } = req.body;
    //UserModel(body).save().then((info)=>{}).catch((err)=>{});
    var info = await model({
        username,
        password: crypot(password)
    }).save().catch((err) => {
        res.send('<script>alert("注册失败！"); location.href="/register"; </script>');
    });
    if (info) {
        res.send('<script>alert("注册成功！"); location.href="/login"; </script>');
    }
}

var loginout = (req, res, next) => {
    req.session.username = null;
    res.redirect('/login');
}


module.exports = {
    register,
    loginout,
    login
}