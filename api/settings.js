var express  = require('express');
var router   = express.Router();
var Setting  = require('../models/setting');
var util     = require('../util');

// index
router.get('/:username', function(req,res,next) {
    Setting.find({username: req.params.username}).sort({no:1}).exec(function(err, settings) {
        res.json( err || !settings ? util.successFalse(err) : util.successTrue(settings));
    });
});

router.get('/:username/:type', function(req,res,next) {
    Setting.find({username: req.params.username, type: req.params.type}).sort({no:1}).exec(function(err, settings) {
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

// 등록된 설정이 아닌 경우 설정을 추가한다.
router.put('/:id', function(req,res,next) {
    Setting.findOne({_id: req.params.id}).exec(function(err, setting){
        if( err || !setting ) {
            var newSetting = new Setting(req.body);
            newSetting.save(function(err, setting) {
                res.json( err || !setting ? util.successFalse(err) : util.successTrue(setting));
            });
        } else {
            for(var p in req.body) {
                setting[p] = req.body[p];
            }
            
            setting.save(function(err, setting) {
                if( err || !setting ) return res.json(util.successFalse(err));
                else {
                    res.json(util.successTrue(setting));
                }
            });
        }
    });
});

// destroy
router.delete('/:id', util.isLoggedin, function(req,res,next) {
    Setting.findOneAndRemove({_id: req.params.id}).exec(function(err, setting){
        res.json(err || !setting ? util.successFalse(err) : util.successTrue(setting));
    });
});

module.exports = router;