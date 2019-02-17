var mongoose = require('mongoose');

var smsSchema = mongoose.Schema({
    sendPhone: {
        type:String
    },
    receivePhone: {
        type:String
    },
    msg: {
        type:String
    },
    result: {
        type: String
    },
    createdAt:{
        type:Date, 
        default:Date.now
    }
});


// model & export
var SMS = mongoose.model('sms',smsSchema);
module.exports = SMS;