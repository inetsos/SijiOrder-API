var express  = require('express');
var router   = express.Router();
var SMS     = require('../models/sms');
var util     = require('../util');

router.post('/sayHello', function(req, res) {
  console.log(req.body);
    const responseBody = {
      "version": "2.0",
      "template": {
        "outputs": [
          {
            "simpleText": {
                "text": "간단한 텍스트 요소입니다."
            }
          }
        ],
        "quickReplies": [
          {
            "label": "테스트1",
            "action": "message",
            "messageText": "테스트 선택"
          },
          {
            "label": "테스트2",
            "action": "message",
            "messageText": "테스트 선택"
          },
          {
            "label": "테스트3",
            "action": "message",
            "messageText": "테스트 선택"
          },
          {
            "label": "테스트4",
            "action": "message",
            "messageText": "테스트 선택"
          },
          {
            "label": "테스트5",
            "action": "message",
            "messageText": "테스트 선택"
          }
        ]
      }
    };
  
    res.json(responseBody);
    // res.status(200).send(responseBody);
  });

// get token
router.get('/:phone', function(req,res,next) {
    SMS.find({sendPhone: req.params.phone})    
    .then((sms) => {
        // res.json( err || !sms ? util.successFalse(err) : util.successTrue(sms));
        //console.log(sms)
        res.json(sms);
    })
    .catch((err) => {
        res.json( err );
    });
});

// create
router.post('/', function(req,res,next) {
    // console.log(req.body);
    var newSMS = new SMS(req.body);
    newSMS.save(function(err, sms) {
        res.json( err || !sms ? util.successFalse(err) : util.successTrue(sms));
    });
});


// destroy
router.delete('/:id', util.isLoggedin, function(req,res,next) {
    SMS.findOneAndRemove({_id: req.params.id}).exec(function(err,sms){
        res.json(err || !sms ? util.successFalse(err) : util.successTrue(sms));
    });
});


module.exports = router;