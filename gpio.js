var http = require('http').createServer(handler); //require http server, and create server wi$
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http); //require socket.io module and pass the http object (serv$
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(6, 'out'); //use GPIO pin 4 as output
var LED2 = new Gpio(13, 'out');
var pushButton = new Gpio(21, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button pr$
var pushButton2 = new Gpio(20, 'in', 'both');

http.listen(7070); //listen to port 7070

function handler (req, res) { //create server
    fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html $
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
        if (lightvalue != LED.readSync()) { //only change LED of status has changed
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
        if (lightvalue2 != LED2.readSync()) { //only change LED of status has changed
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

