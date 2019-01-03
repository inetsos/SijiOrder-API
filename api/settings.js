var express  = require('express');
var router   = express.Router();
var Setting  = require('../models/setting');
var util     = require('../util');

// index
router.get('/:username', util.isLoggedin, function(req,res,next) {
    Setting.find({username: req.params.username}).sort({type:1}).exec(function(err, settings) {
        res.json( err || !settings ? util.successFalse(err) : util.successTrue(settings));
    });
});

router.get('/:username/:type', util.isLoggedin, function(req,res,next) {
    Setting.find({username: req.params.username, type: req.params.type}).sort({type:1}).exec(function(err, settings) {
        res.json( err || !settings ? util.successFalse(err) : util.successTrue(settings));
    });
});


// create
router.post('/', function(req,res,next) {
    var newSetting = new Setting(req.body);
    newSetting.save(function(err, setting) {
        res.json( err || !setting ? util.successFalse(err) : util.successTrue(setting));
    });
});

// destroy
router.delete('/:id', util.isLoggedin, function(req,res,next) {
    Setting.findOneAndRemove({_id: req.params.id}).exec(function(err, setting){
        res.json(err || !setting ? util.successFalse(err) : util.successTrue(setting));
    });
});

module.exports = router;