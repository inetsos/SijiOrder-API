var mongoose = require('mongoose');

// schema
var orderSchema = mongoose.Schema({
    storename: {  type:String },    // 가맹점
    shopname: { type:String },      // 가맹점 상호           
    username: { type:String },      // 회원
    phoneno: { type:String, default: '' },  // 비회원 전화번호
    password:{ type:String, default: '' },  // 비회원 비밀번호    
    roadAddr: { type: String },   // 도로명 주소
    jibunAddr: { type: String },  // 지번 주소
    detailAddr: { type: String }, // 상세주소
    type:{ type:Number, default: 0 },   // 0: 회원, 1: 비회원
    tableNo: { type:Number },
    orderNo: { type:Number },
    status: { type:String },
    createdAt: { type:Date, default:Date.now },
    orderedAt: { type:Date },
    confirmedAt: { type: Date },
    ordermenu: [
        {
            menuNo: { type:Number },
            classify: { type:String },
            name: { type:String },
            price: { type:Number },
            number: { type:Number },
            sum: { type:Number }  
        }
    ]
});

// model & export
var Order = mongoose.model('order',orderSchema);
module.exports = Order;