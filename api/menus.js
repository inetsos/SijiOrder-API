var express  = require('express');
var router   = express.Router();
var Menu     = require('../models/menu');
var util     = require('../util');

// index
router.get('/:username', util.isLoggedin, function(req,res,next) {
    Menu.find({username: req.params.username}).sort({menuNo:1}).exec(function(err,menus) {
        res.json( err || !menus ? util.successFalse(err) : util.successTrue(menus));
    });
});

// MyModel.find().distinct('_id', function(error, ids) {
//     // ids is an array of all ObjectIds
//     });

// router.get('/groups/:username', util.isLoggedin, function(req,res,next) {
//     Menu.find({username: req.params.username}).distinct({menuNo:1}).exec(function(err,menus) {
//         res.json( err || !menus ? util.successFalse(err) : util.successTrue(menus));
//     });
// });

// create
router.post('/', function(req,res,next) {
    var newMenu = new Menu(req.body);
    newMenu.save(function(err,menu) {
        res.json( err || !menu ? util.successFalse(err) : util.successTrue(menu));
    });
});

// show
router.get('/:username/:menuNo', util.isLoggedin, function(req,res,next) {
    Menu.findOne({username: req.params.username, menuNo: req.params.menuNo}).exec(function(err,menu) {
        res.json( err || !menu ? util.successFalse(err) : util.successTrue(menu));
    });
});

// update
router.put('/:username/:menuNo', util.isLoggedin, function(req,res,next) {
    Menu.findOne({username: req.params.username, menuNo: req.params.menuNo}).exec(function(err,menu) {
        if( err || !menu ) 
            return res.json(util.successFalse(err));

        // update menu object
         for(var p in req.body){
            menu[p] = req.body[p];
        }

        // save updated user
        menu.save(function(err,menu) {
            if( err || !menu) 
                return res.json(util.successFalse(err));
            else {
                res.json(util.successTrue(menu));
            }
        });
    });
});

// destroy
router.delete('/:username/:menuNo', util.isLoggedin, function(req,res,next) {
    Menu.findOneAndRemove({username: req.params.username, menuNo: req.params.menuNo}).exec(function(err,menu){
        res.json(err || !menu ? util.successFalse(err) : util.successTrue(menu));
    });
});

module.exports = router;