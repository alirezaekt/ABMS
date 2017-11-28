
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var voip = require('./routes/voip');
var app = express(); // 3000 rest-api
var fs = require('fs'); //require filesystem module
var http = require('http').createServer(handler); // 7070 gio
http.listen(7070); //listen to port 7070
var io = require('socket.io')(http); //require socket.io module and pass the http object (serv$
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(6, 'out'); //use GPIO pin 4 as output
var LED2 = new Gpio(13, 'out');
var pushButton = new Gpio(21, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button pr$
var pushButton2 = new Gpio(20, 'in', 'both');




function handler (req, res) {
    fs.readFile(__dirname + '/views/index.html', function(err, data) { //read file index.html $
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
        res.write(data); //write data from index.html
        return res.end();
    });
}

io.sockets.on('connection', function (socket) {
// WebSocket Connection
    var lightvalue = 0; //static variable for current status
    pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
        if (err) { //if an error
            console.error('There was an error', err); //output error message to console
            return;
        }
        lightvalue = value;
        socket.emit('light', lightvalue); //send button status to client
    });
    socket.on('light', function(data) { //get light switch status from client
        lightvalue = data;
        if (lightvalue !== LED.readSync()) { //only change LED of status has changed
            LED.writeSync(lightvalue); //turn LED on or off
        }
    });


    var lightvalue2 = 0; //static variable for current status
    pushButton2.watch(function (err, value) { //Watch for hardware interrupts on pushButton
        if (err) { //if an error
            console.error('There was an error', err); //output error message to console
            return;
        }
        lightvalue2 = value;
        socket.emit('light2', lightvalue2); //send button status to client
    });
    socket.on('light2', function(data) { //get light switch status from client
        lightvalue2 = data;
        if (lightvalue2 !== LED2.readSync()) { //only change LED of status has changed
            LED2.writeSync(lightvalue2); //turn LED on or off
        }
    });

});

process.on('SIGINT', function () { //on ctrl+c
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport LED GPIO to free resources
    LED2.writeSync(0); // Turn LED off
    LED2.unexport();
    pushButton.unexport(); // Unexport Button GPIO to free resources
    pushButton2.unexport();
    process.exit(); //exit completely
});


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
