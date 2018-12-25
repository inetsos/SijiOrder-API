var express    = require('express');
var vhost      = require('vhost');
var app        = express();
var path       = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

// Database
console.log(process.env.MONGO_SIJIORDER)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_SIJIORDER, { useCreateIndex: true, useNewUrlParser: true} );
var db = mongoose.connection;
db.once('open', function () {
    console.log('DB connected!');
});
db.on('error', function (err) {
    console.log('DB ERROR:', err);
});


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});

// API
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));

app.get("/", function(req, res) {
  res.send("주문할 땐? 시지오더 SiJiOrder !!!");
});

var hostname = 'sijiorder-api.orderfood.co.kr';
var port = 2020;

var server = express();
server.use(vhost(hostname, app));


// Server
server.listen(port, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});