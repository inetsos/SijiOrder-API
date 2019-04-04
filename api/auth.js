var express  = require('express');
var router   = express.Router();
var Store     = require('../models/Store');
var User     = require('../models/User');
var util     = require('../util');
var jwt      = require('jsonwebtoken');

// ---- User login -----
router.post('/login', function(req,res,next) {
    var isValid = true;
    var validationError = {
        name:'ValidationError',
        errors:{}
    };

    if(!req.body.username) {
        isValid = false;
        validationError.errors.username = {message:'사용자이름을 입력하세요.'};
    }
    if(!req.body.password) {
        isValid = false;
        validationError.errors.password = {message:'비밀번호를 입력하세요.'};
    }

    if(!isValid) 
        return res.json(util.successFalse(validationError));
    else 
        next();
}, function(req,res,next) {
    User.findOne({username:req.body.username, group: req.body.group}).select({password:1,username:1,name:1,email:1}).exec(function(err,user) {
        if(err) 
            return res.json(util.successFalse(err));
        else if(!user||!user.authenticate(req.body.password))
            return res.json(util.successFalse(null,'아이디와 비밀번호를 다시 확인바랍니다.'));
        else {
            var payload = {
                _id : user._id,
                username: user.username
            };
            var secretOrPrivateKey = process.env.JWT_SECRET;
            var options = {expiresIn: 60*60*24};
            jwt.sign(payload, secretOrPrivateKey, options, function(err, token) {
                if(err) 
                    return res.json(util.successFalse(err));
                res.json(util.successTrue(token));
            });
        }
    });
});

// me
router.get('/me', util.isLoggedin, function(req,res,next) {
    User.findById(req.decoded._id).exec(function(err,user){
        if( err || !user ) 
            return res.json(util.successFalse(err));
        res.json(util.successTrue(user));
    });
});

// refresh
router.get('/refresh', util.isLoggedin, function(req,res,next) {
    User.findById(req.decoded._id).exec(function(err,user) {
        if( err || !user ) 
            return res.json(util.successFalse(err));
        else {
            var payload = {
                _id : user._id,
                username: user.username
            };
            var secretOrPrivateKey = process.env.JWT_SECRET;
            var options = {expiresIn: 60*60*24};
            jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
                if(err) 
                    return res.json(util.successFalse(err));
                res.json(util.successTrue(token));
            });
        }
    });
});


// ---- Store login -----
router.post('/store/login', function(req,res,next) {
    var isValid = true;
    var validationError = {
        name:'ValidationError',
        errors:{}
    };

    if(!req.body.username) {
        isValid = false;
        validationError.errors.username = {message:'사용자이름을 입력하세요.'};
    }
    if(!req.body.password) {
        isValid = false;
        validationError.errors.password = {message:'비밀번호를 입력하세요.'};
    }

    if(!isValid) 
        return res.json(util.successFalse(validationError));
    else 
        next();
}, function(req,res,next) {
    Store.findOne({username:req.body.username}).select({password:1,username:1,name:1,email:1}).exec(function(err, store) {
        if(err) 
            return res.json(util.successFalse(err));
        else if(!store || !store.authenticate(req.body.password))
            return res.json(util.successFalse(null,'아이디와 비밀번호를 다시 확인바랍니다.'));
        else {
            var payload = {
                _id : store._id,
                username: store.username
            };
            var secretOrPrivateKey = process.env.JWT_SECRET;
            var options = {expiresIn: 60*60*24};
            jwt.sign(payload, secretOrPrivateKey, options, function(err, token) {
                if(err) 
                    return res.json(util.successFalse(err));
                res.json(util.successTrue(token));
            });
        }
    });
});

// me
router.get('/store/me', util.isLoggedin, function(req,res,next) {
    Store.findById(req.decoded._id).exec(function(err, store){
        if( err || !store ) 
            return res.json(util.successFalse(err));
        res.json(util.successTrue(store));
    });
});

// refresh
router.get('/store/refresh', util.isLoggedin, function(req,res,next) {
    Store.findById(req.decoded._id).exec(function(err, store) {
        if( err || !store ) 
            return res.json(util.successFalse(err));
        else {
            var payload = {
                _id : store._id,
                username: store.username
            };
            var secretOrPrivateKey = process.env.JWT_SECRET;
            var options = {expiresIn: 60*60*24};
            jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
                if(err) 
                    return res.json(util.successFalse(err));
                res.json(util.successTrue(token));
            });
        }
    });
});

module.exports = router;