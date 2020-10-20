var mongoose = require("mongoose")
var userSchema = mongoose.Schema({
    username : { type : String , required : true , unique : true },
    password : { type : String , required : true }
});

var UserModel = mongoose.model('userList' , userSchema);

module.exports = UserModel;


{/* <span
                      v-for="(item2, index2) in item1.answers"
                      :key="index2"
                      @click="checked(item1, item2)"
                    >
                      <p>{{ item2.subjectAnswer }}</p>
                      <i
                        class="iconfont icon-selected-copy"
                        :class="item2.indexBox ? 'active1' : 'active2'"
                      ></i>
                    </span>


                    checked(item1, item2) {
                        if (item1.Box) {
                            item1.Box.indexBox= false ;
                            item1.Box = item2;
                            item1.Box.indexBox= true ;
                        } else {
                            item1.Box= item2 ;
                            item1.Box.indexBox = true;
                        }
                        数组.sort()
                      },
                     */}