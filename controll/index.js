const postModel = require("../model/postModel")

// var postModel = require("../model/postModel");

var register = (req, res, next) => {
    res.render("register")
}

var login = (req, res, next) => {
    res.render("login")
}


var loginout = (req, res, next) => {
    res.render("loginout")
}
var index_postedit =(req, res, next) => {
    var page = req.params.page;  // 
    var count = 10;

    Promise.all([
        postModel.find().skip((page-1)*count).limit(count),
        postModel.find().count()
    ]).then((infos)=>{
        res.render("index_postedit",{
            username : req.session.username,
            infos : infos[0],
            pages : Math.ceil(infos[1]/count),
            now : Number(page)
        })
    }).catch((err)=>{
        res.render('index_postedit',{
            username : req.session.username,
            infos : [],
            pages : 0,
            now : 0
        });
    })
};
var index_postadd = (req, res, next) => {
    res.render('index_postadd', {
        username: req.session.username
    });
};

var index_postupdate = (req, res, next) => {
    postModel.findOne({ postId: req.params.postId }).then(info => {
        res.render("index_postupdate", {
            username: req.session.username,
            info
        })
    }).catch(err => {
        res.render("index_postupdate", {
            username: req.session.username,
            info: {}
        })

    })
}

module.exports = {
    register,
    login,
    loginout,
    index_postedit,
    index_postadd,
    index_postupdate,
   
}