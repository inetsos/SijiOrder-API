// http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do?currentPage=1&countPerPage=10&keyword=강남대로12길&confmKey=TESTJUSOGOKR&resultType=json 
// http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=%EA%B0%95%EC%84%9C%EB%A1%9C7%EA%B8%B8&confmKey=TESTJUSOGOKR&resultType=json

var express  = require('express');
var router   = express.Router();
var util     = require('../util');
var http = require('http');
var url = require('url');
var requestify = require('requestify');

var jusoKey = process.env.JUSO_KEY;

router.get('/:keyword', function(req,res,next) {
    // console.log(req.body);
    var currentPage = 1;
    var countPerPage = 1000;
    var confmKey = jusoKey;
    var resultType = "json";
    var keyword =  req.params.keyword;

    var apiurl = "http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=" + currentPage + 
        "&countPerPage=" + countPerPage + "&keyword=" + keyword + "&confmKey=" + confmKey + "&resultType=" + resultType;
        
    requestify.get(apiurl).then(function(response) {
        // Get the response body (JSON parsed or jQuery object for XMLs)
        res.json( util.successTrue(response.getBody()));
    });
});

module.exports = router;
