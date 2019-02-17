var mongoose = require('mongoose');

// 설정 - username, type, value
// schema
var settingSchema = mongoose.Schema({
    no: {
        type: Number
    },
    type: {
        type:String,
        required:[true,'설정타입을 입력하세요.'],
        match: [/^.{2,20}$/,'2~20 글자입니다.'],
        trim:true
    },
    content: {
        type:String,
        trim:true
    },
    apply: {
        type: Number,
        default: 1
    },
    username: {
        type:String,
        trim:true
    },
    createdAt: {
        type:Date, 
        default:Date.now
    }
});


// model & export
var Setting = mongoose.model('setting',settingSchema);
module.exports = Setting;