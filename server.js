var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
 
var databaseConfig = require('./config/database');
var router = require('./app/routes');
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.sendStatus(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
 
mongoose.connect(databaseConfig.url);
 
app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan

 
router(app);