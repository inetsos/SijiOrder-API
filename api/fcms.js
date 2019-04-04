var express  = require('express');
var router   = express.Router();
var FCM     = require('../models/fcm');
var util     = require('../util');
var FCMPush = require('fcm-push');

var serverKey = process.env.FCM_SERVER_KEY;
var fcmPush = new FCMPush(serverKey);

// get token
router.get('/:phone', function(req,res,next) {
    FCM.findOne({phone: req.params.phone}).exec(function(err,fcm) {
        res.json( err || !fcm ? util.successFalse(err) : util.successTrue(fcm));
    });
});

// create
router.post('/', function(req,res,next) {
    // console.log(req.body);
    var newFCM = new FCM(req.body);
    newFCM.save(function(err, fcm) {
        res.json( err || !fcm ? util.successFalse(err) : util.successTrue(fcm));
    });
});

router.post('/:phone', function(req,res,next) {
    // console.log(req.body);
    FCM.findOne({phone: req.params.phone}).exec(function(err,fcm) {
        if( err || !fcm ) {
            var newFCM = new FCM(req.body);
            newFCM.save(function(err, fcm) {
                res.json( err || !fcm ? util.successFalse(err) : util.successTrue(fcm));
            });
        } else {
            // update menu object
            for(var p in req.body){
                fcm[p] = req.body[p];
            }

            // save updated user
            fcm.save(function(err,fcm) {
                if( err || !fcm) 
                    return res.json(util.successFalse(err));
                else {
                    res.json(util.successTrue(fcm));
                }
            });
        }
    });
});

// update
router.put('/:phone', util.isLoggedin, function(req,res,next) {
    FCM.findOne({phone: req.params.phone}).exec(function(err,fcm) {
        if( err || !fcm ) 
            return res.json(util.successFalse(err));

        // update menu object
         for(var p in req.body){
            fcm[p] = req.body[p];
        }

        // save updated user
        fcm.save(function(err,fcm) {
            if( err || !fcm) 
                return res.json(util.successFalse(err));
            else {
                res.json(util.successTrue(fcm));
            }
        });
    });
});

// destroy
router.delete('/:phone', util.isLoggedin, function(req,res,next) {
    FCM.findOneAndRemove({phone: req.params.phone}).exec(function(err,fcm){
        res.json(err || !fcm ? util.successFalse(err) : util.successTrue(fcm));
    });
});

// var message = {
//     to: 'registration_token_or_topics', // required fill with device token or topics
//     collapse_key: 'your_collapse_key', 
//     data: {
//         your_custom_data_key: 'your_custom_data_value'
//     },
//     notification: {
//         title: 'Title of your push notification',
//         body: 'Body of your push notification'
//     }
// };


router.post('/sendFCM/:phone', util.isLoggedin, function(req,res,next) {
    // var sendMsg = JSON.parse(req.body);
    var message = req.body;
    // 폰번호로 토큰을 찾는다.
    FCM.findOne({phone: req.params.phone}).then((token) => {
        message.to = token.token;
// console.log(message);
        fcmPush.send(message)
        .then(function(response){
            // console.log("1.", response);
            return util.successTrue(response);
        })
        .catch(function(err){
            // console.log("2.", err);
            return util.successFalse(err);
        });
        
    }).catch((err) => {
        // console.log('3.', err);
        return util.successFalse(err);
    });
});

module.exports = router;