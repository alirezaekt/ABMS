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

var SerialPort = require('serialport');
var port = new SerialPort('/dev/serial0',{
        baudRate: 115200,
        databits: 8,
        parity: 'none',
        autoOpen :false
    }
)
port.open(function (err) {
    console.log('port open shod');
    if (err) {
        return console.log('Error opening port: ', err.message);
    }
    console.log('hi');
});
port.on('error', function(err) {
    console.log('Error: ', err.message);
});


function writeAndDrain (data, callback) {
    port.write(data);
    port.drain(callback);
}

//--- serial funcrions
router.get('/serialp',function (req,res) {

    console.log('new request recieved') ;
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = 0x00;
    console.log('man ghable write am');
    // port.write(buffer, function(err) {
    //    if (err) {
    //        return console.log('Error on write: ', err.message);
    //     }
    //     console.log('message written');
    //  });
    writeAndDrain ( buffer, function (){
        port.flush(function (err){
            console.log('write kardam age error bood  ',err);
        })
    });
    console.log('man bade write am');
// Open errors will be emitted as an error event

    console.log("serialdone")
    res.send(true);
});

router.get('/getAllData',function (req,res) {
    var buffer = new Buffer(3);
    buffer[0] = 0x05;
    buffer[1] = 0x00;
    buffer[2] = 0x0F;
    res.send([lamp1,lamp2]);
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
    port.flush(function(err){});
    console.log('hashi hashi gerftamesh requesto ');
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = 0x0F;

    console.log ('man ghable write e dovomam') ;

    writeAndDrain ( buffer, function (){
        port.flush(function (err){
            console.log('write kardam age error bood  ',err);
        })
    });

    console.log('man bade write dovomiam') ;
    port.flush(function(err){
        console.log('dovomin flusham kardam');
        if (err)
            console.log ('dovominflusher',err);
    });
    console.log("serialdone");
    res.send(true);
});


