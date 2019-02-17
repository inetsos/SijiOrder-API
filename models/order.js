var mongoose = require('mongoose');

// schema
var orderSchema = mongoose.Schema({
    storename:{  // 가맹점
        type:String
    },
    shopname:{  // 가맹점 상호
        type:String
    },
    username:{  // 회원
        type:String
    },
    phoneno:{  // 비회원 전화번호
        type:String,
        default: ''
    },
    password:{  // 비회원 비밀번호
        type:String,
        default: ''
    },
    type:{  // 0: 회원, 1: 비회원
        type:Number,
        default: 0
    },
    tableNo:{
        type:Number
    },
    orderNo:{
        type:Number
    },
    status:{
        type:String
    },
    createdAt:{
        type:Date, 
        default:Date.now
    },
    orderedAt: {    // 주문완료 시간
        type:Date
    },
    confirmedAt: {
        type: Date
    },
    ordermenu: [
        { type:mongoose.Schema.Types.ObjectId, ref:"ordermenu" }
    ]
});

// model & export
var Order = mongoose.model('order',orderSchema);
module.exports = Order;