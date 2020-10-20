var postModel = require("../model/postModel")
var fs = require("fs");
var path = require("path")
var countModel = require("../model/couner")
var add = async (req, res, next) => {
    var body = req.body;
    var file = req.file;
    console.log("111")
    fs.renameSync(path.join('./public/uploads', file.filename), path.join('./public/uploads', file.filename + ".png"));

    var { postId } = await countModel.findOneAndUpdate({}, { $inc: { postId: 1 } }, { upsert: true, new: true })

    var data = {
        ...body,
        companyLogo: "http://localhost:3000/uploads/" + file.filename + ".png",
        postId
    }

    postModel(data).save().then((info) => {
        if (info) {
            res.send('<script>alert("添加职位成功！"); history.back();</script>')
        }
    }).catch((err) => {
        res.send('<script>alert("添加职位失败！"); history.back();</script>')
    })

}
var update = (req, res, next) => {
    var body = req.body;
    var file = req.file;
    if (file) {
        console.log("11")
        body.prevLogo = body.prevLogo.replace(/http:\/\/localhost:3000/, './public');
        fs.unlinkSync(body.prevLogo);
        delete body.prevLogo;

        fs.renameSync(path.join('./public/uploads', file.filename), path.join('./public/uploads', file.filename + '.png'));

        var data = {
            ...body,
            companyLogo: 'http://localhost:3000/uploads/' + file.filename + '.png'
        };
        postModel.update({ postId: body.postId }, { $set: data }).then((info => {

            res.send('<script>alert("更新成功！！！"); history.back();</script>');
        })).catch(err => {
            res.send('<script>alert("更新失败！！！"); history.back();</script>');
        })
    } else {
        postModel.update({ postId: body.postId }, { $set: body }).then((info) => {

            res.send('<script>alert("更新成功！！！"); history.back();</script>');

        }).catch((err) => {

            res.send('<script>alert("更新失败！！！"); history.back();</script>');

        })
    }
}

var deleter = (req, res, next) => {
    var postId = req.params.postId;
    postModel.deleteOne({ postId }).then(data => {
        res.send("<script>alert('删除成功');location.href='/index/postedit/1'; </script>")
    }).catch(err => {
        res.send("<script>alert('删除失败');location.href='/index/postedit';</script>")
    })
}
module.exports = {
    add,
    update,
    deleter
}