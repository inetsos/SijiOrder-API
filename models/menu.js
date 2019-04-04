var mongoose = require('mongoose');

// 메뉴번호, 분류, 이름, 단가, 설명
// schema
var menuSchema = mongoose.Schema({
    menuNo: {
        type:Number,
        required:[true,'메뉴번호를 입력하세요.'],
        match: [/^[0-9]*$/,'숫자만 입력하세요.'],
        trim:true
    },
    classify: {
        type:String,
        required:[true,'분류 입력하세요.'],
        match: [/^.{2,20}$/,'2~20 글자입니다.'],
        trim:true
    },
    name: {
        type:String,
        required:[true,'메뉴이름을 입력하세요.'],
        match: [/^.{2,20}$/,'2~20 글자입니다.'],
        trim:true
    },
    price: {
        type:Number,
        required:[true,'가격을 입력하세요.'],
        match: [/^[0-9]*$/,'숫자만 입력하세요.'],        
        trim:true
    },
    image: {
        type: Number
    },
    description: {
        type:String,
        trim:true
    },
    username: {
        type:String,
        trim:true
    },
    premia : [
        {
            size: { type: String }, 
            premium_price: { type: Number}
        }
    ]
});


// model & export
var Menu = mongoose.model('menu',menuSchema);
module.exports = Menu;