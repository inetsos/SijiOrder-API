var mongoose = require('mongoose');

var fcmSchema = mongoose.Schema({
    phone: {
        type:String,
        unique:true,
        trim:true
    },
    token: {
        type:String
    },
    createdAt:{
        type:Date, 
        default:Date.now
    }
});


// model & export
var FCM = mongoose.model('fcm',fcmSchema);
module.exports = FCM;