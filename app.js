var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var voip = require('./routes/voip');
var videocalltest = require('./routes/videocalltest');
var settings = require('./routes/settings');
var app = express();

app.set('views', path.join(__dirname, 'public/views'));

// view engine setup
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/",express.static(__dirname+'/public'));
app.use('/', index);
app.use('/users', users);
app.use('/voip', voip);
app.use('/videocalltest', videocalltest);
app.use('/settings', settings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found-__-');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message + " - " + err.statusCode);
});


module.exports = app;








