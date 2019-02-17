var express  = require('express');
var router   = express.Router();
var Order     = require('../models/order');
var OrderMenu     = require('../models/ordermenu');
var util     = require('../util');
var moment = require('moment');

// 가맹점 회원의 모든 주문을 보낸다.
router.get('/:storename', util.isLoggedin, function(req,res,next) {
    Order.find({storename: req.params.storename})
    .populate('ordermenu')
    .sort({orderNo:1})
    .exec(function(err, orders) {
        res.json( err || !orders ? util.successFalse(err) : util.successTrue(orders));
    });
});

// 가맹점의 오늘 주문
router.get('/today/:storename/:today', util.isLoggedin, function(req,res,next) {

    var str = req.params.today.split('-');
    var year = Number(str[0]);
    var month = Number(str[1]) - 1;
    var date = Number(str[2]);

    var tmp =  new Date(year, month, date);
    var today = moment(tmp).format('YYYY-MM-DD');
    var tomorrow = moment(moment(tmp).add(1, 'days')).format('YYYY-MM-DD');

    Order.find({storename: req.params.storename, createdAt: {$gte: today, $lt: tomorrow}})
    .populate('ordermenu')
    .sort({orderNo:1})
    .exec(function(err, orders) {
        res.json( err || !orders ? util.successFalse(err) : util.successTrue(orders));
    });
});

// 내 주문 조회
// router.get('/myorder/:username/:today', util.isLoggedin, function(req,res,next) {
router.get('/myorder/:username', util.isLoggedin, function(req,res,next) {

    // var str = req.params.today.split('-');
    // var year = Number(str[0]);
    // var month = Number(str[1]) - 1;
    // var date = Number(str[2]);

    // var tmp =  new Date(year, month, date);
    // var today = moment(tmp).format('YYYY-MM-DD');
    // var tomorrow = moment(moment(tmp).add(1, 'days')).format('YYYY-MM-DD');

    // Order.find({username: req.params.username, createdAt: {$gte: today, $lt: tomorrow}})
    Order.find({username: req.params.username})
    .populate('ordermenu')
    .sort({orderNo:-1})
    .exec(function(err, orders) {
        res.json( err || !orders ? util.successFalse(err) : util.successTrue(orders));
    });
});


// 가장 최근의 주문을 얻는다.
router.get('/last/:storename/:username', util.isLoggedin, function(req,res,next) {
    Order.findOne({storename: req.params.storename, username: req.params.username})
    .populate('ordermenu')
    .sort({orderNo:-1})
    .exec(function(err, order) {
        res.json( err || !order ? util.successFalse(err) : util.successTrue(order));
    });
});

// 현재 주문중인 주문서를 보낸다.
router.get('/ordering/:storename/:username', util.isLoggedin, function(req,res,next) {
    Order.findOne({storename: req.params.storename, username: req.params.username, status: {$in: ['선택', '주문', '접수']}})
    .populate('ordermenu')
    .sort({orderNo:-1})
    .exec(function(err, orders) {
        res.json( err || !orders ? util.successFalse(err) : util.successTrue(orders));
    });
});

router.get('/nonmember/:storename/:phoneno', function(req,res,next) {
    Order.findOne({storename: req.params.storename, phoneno: req.params.phoneno, status: {$in: ['선택', '주문', '접수']}})
    .populate('ordermenu')
    .sort({orderNo:-1})
    .exec(function(err, orders) {
        res.json( err || !orders ? util.successFalse(err) : util.successTrue(orders));
    });
});


router.post('/order', function(req,res,next){
    var newOrder = new Order(req.body);
    newOrder.save(function(err, order){
        res.json(err || !order ? util.successFalse(err) : util.successTrue(order));
    });
});

router.post('/ordermenu', function(req,res,next){
    var newOrdermenu = new OrderMenu(req.body);
    newOrdermenu.save(function(err, ordermenu){
        res.json(err || !ordermenu ? util.successFalse(err) : util.successTrue(ordermenu));
    });
});

// 주문정보를 수정한다. ( 주문 메뉴의 추가 등 )
router.put('/order/:id', function(req,res,next){
    Order.findOne({_id: req.params.id}).exec(function(err, order){
        if( err || !order ) 
            return res.json(util.successFalse(err));

        for(var p in req.body) {
            order[p] = req.body[p];
        }
        
        order.save(function(err, order) {
            if( err || !order ) return res.json(util.successFalse(err));
            else {
                res.json(util.successTrue(order));
            }
        });
    });
});

router.put('/ordermenu/:id', function(req,res,next){
    OrderMenu.findOne({_id: req.params.id}).exec(function(err, ordermenu){
        if( err || !ordermenu ) 
            return res.json(util.successFalse(err));

        for(var p in req.body) {
            ordermenu[p] = req.body[p];
        }

        ordermenu.save(function(err, ordermenu) {
            if( err || !ordermenu ) return res.json(util.successFalse(err));
            else {
                res.json(util.successTrue(ordermenu));
            }
        });
    });
});

// 주문메뉴를 삭제한다.
router.delete('/order/:id', function(req,res,next){
    Order.findOneAndRemove({_id: req.params.id}).exec(function(err, order) { 
        res.json(err || !order? util.successFalse(err) : util.successTrue(order));
    });
});

router.delete('/ordermenu/:id', function(req,res,next){
    OrderMenu.findOneAndRemove({_id: req.params.id}).exec(function(err, ordermenu) { 
        res.json(err || !ordermenu? util.successFalse(err) : util.successTrue(ordermenu));
    });
});

module.exports = router;
