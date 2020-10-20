var postmodel = require("../model/postModel");

var getlist = (req,res,next)=>{
    console.log(postmodel)
    postmodel.find().sort({postId : -1}).limit(20).then(infors=>{
        res.json({
            code : 0 ,
            errmsg :"ok",
            list : infors
        })
    }).catch(err=>{
        res.json({
            code : -1 , 
            errmsg :"not found",
            list : []
        })
    })
}

module.exports={
    getlist,
}