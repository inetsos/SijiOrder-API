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