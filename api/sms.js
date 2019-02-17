var express  = require('express');
var router   = express.Router();
var SMS     = require('../models/sms');
var util     = require('../util');

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