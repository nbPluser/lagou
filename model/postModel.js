var mongoose = require("mongoose");
var workSchema = mongoose.Schema({
    postName : { type : String , required : true },
    postCity : { type : String , required : true },
    postMoney : { type : String , required : true },
    postYear : { type : String , required : true },
    postEdu : { type : String , required : true },
    companyName : { type : String , required : true },
    companyLogo : { type : String , required : true },
    postMessage : { type : String , required : true },
    postId : { type : Number , required : true }
})
var postModel = mongoose.model("workList",workSchema) ;

module.exports = postModel;