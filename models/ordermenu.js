var mongoose = require('mongoose');

// 회원 아이디, 메뉴번호, 메뉴이름, 단가, 설명
// schema
var ordermenuSchema = mongoose.Schema({
    storename:{  // 가맹점
        type:String
    },
    username:{  // 회원
        type:String
    },
    orderNo:{
        type:Number
    },
    menuNo:{
        type:Number
    },
    classify:{ 
        type:String
    },
    name:{
        type:String
    },
    price:{
        type:Number,
    },
    number:{
        type:Number,
    },
    sum:{
        type:Number,
    }    
});

// model & export
var OrderMenu = mongoose.model('ordermenu',ordermenuSchema);
module.exports = OrderMenu;