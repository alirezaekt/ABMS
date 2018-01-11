var express = require('express');
var router = express.Router();
var io = require('socket.io')();
var lamp1 = {"number":5,"value":1};
var lamp2 = {"number":4,"value":0};
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index.html');
});
router.get('/admin', function(req, res) {
    res.send(true);
});
router.post('/admin', function(req, res) {

});
module.exports = router;

//--- serial funcrions
router.get('/serialp',function (req,res) {
    var buffer = new Buffer(3);
    buffer[0] = 0x05;
    buffer[1] = 0x00;
    buffer[2] = 0x0F;

    var SerialPort = require('serialport');
    var port = new SerialPort('/dev/serial0',{
            baudRate: 115200,
            databits: 8,
            parity: 'none',
            autoOpen :false
        }
    );
    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        console.log('hi');
    });
    port.on('data',function(data){
        console.log('data :  ',data) ;
    });

    port.write(buffer, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });

// Open errors will be emitted as an error event
    port.on('error', function(err) {
        console.log('Error: ', err.message);
    });
    console.log("serialdone")
});

router.get('/getAllData',function (req,res) {
    var buffer = new Buffer(3);
    buffer[0] = 0x05;
    buffer[1] = 0x00;
    buffer[2] = 0x0F;
    res.send([lamp1,lamp2]);
    // var SerialPort = require('serialport');
    // var port = new SerialPort('/dev/serial0',{
    //         baudRate: 115200,
    //         databits: 8,
    //         parity: 'none',
    //         autoOpen :false
    //     }
    // );
    // port.open(function(err){
    //     if (err) {
    //         return console.log('Error opening port: ', err.message);
    //     }
    //     console.log('connected X');
    // });
    // port.on('data',function(data){
    //     console.log('data :  ',data) ;
    // });
});
router.get('/changeData',function (req,res) {
    if(lamp2["value"]===1)
    {
        lamp2["value"]=0;
    }
    else{
        lamp2["value"]=1;
    }
    res.send(lamp2);
});

router.get('/serialp2',function (req,res) {
    var buffer = new Buffer(3);
    buffer[0] = 0x05;
    buffer[1] = 0x80;
    buffer[2] = 0x0F;

    var SerialPort = require('serialport');
    var port = new SerialPort('/dev/serial0',{
            baudRate: 115200,
            databits: 8,
            parity: 'none',
            autoOpen :false
        }
    );
    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        console.log('hi');
    });
    port.on('data',function(data){
        console.log('data :  ',data) ;
    });

    port.write(buffer, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });

// Open errors will be emitted as an error event
    port.on('error', function(err) {
        console.log('Error: ', err.message);
    })
    console.log("serialdone")
});