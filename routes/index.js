var express = require('express');
var router = express.Router();
var io = require('socket.io')();
var lamp1 = {"number":1,"value":0};
var lamp2 = {"number":2,"value":0};
var lamp3 = {"number":3,"value":0};
var lamp4 = {"number":4,"value":0};
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
router.get ('/readdata', function (req,res) {

        function writeAndDrain (data, callback) {
            port.write(data);
            port.drain(callback);
        }
        console.log('new request recieved') ;
        var buffer = new Buffer(3);
        buffer[0] = 0x0D;
        buffer[1] = 0x80;
        buffer[2] = 0x03;
        console.log('man ghable write am');

        writeAndDrain ( buffer, function (){
            port.flush(function (err){
                console.log('write kardam age error bood  ',err);
            })
        });
        console.log('man bade write am');


    console.log("serialdone");


    port.on ('open',function(){
        console.log ('evente open inja seda zade shod');
        port.on('data', function(data) {
            console.log('data1: ', data);
        });
    });

    port.on ('data',function(data) {
        console.log ('data2:  ' , data) ;
    });


});
var output ;
router.get('/getAllData',function (req,res) {


    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    console.log('new request recieved') ;
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x80;
    buffer[2] = 0x03;
    console.log('man ghable write am');

    writeAndDrain ( buffer, function (){

    });
    console.log('man bade write am');


    console.log("serialdone");


    port.on ('open',function(){
        console.log ('evente open inja seda zade shod');
        port.on('data', function(data) {
            //console.log('data: ', data);
        });
    });

    port.on ('data',function(data) {
        console.log ('data3:  ' , data) ;
        output = data[0] ;
        });
    switch (output)  {
        case 0 : {
            lamp1["value"] = 1 ;
            lamp2["value"] = 1 ;
            lamp3["value"] = 1 ;
            lamp4["value"] = 1 ;
        }
        break;
        case 1 : {
            lamp1["value"] = 0 ;
            lamp2["value"] = 1 ;
            lamp3["value"] = 1 ;
            lamp4["value"] = 1 ;
        }
        break;
        case 0x02 : {
            lamp1["value"] = 1 ;
            lamp2["value"] = 0 ;
            lamp3["value"] = 1 ;
            lamp4["value"] = 1 ;
        }
        break;
        case 0x03 : {
            lamp1["value"] = 0 ;
            lamp2["value"] = 0 ;
            lamp3["value"] = 1 ;
            lamp4["value"] = 1 ;
        }
        break;
        case 0x04 : {
            lamp1["value"] = 1 ;
            lamp2["value"] = 1 ;
            lamp3["value"] = 0 ;
            lamp4["value"] = 1 ;
        }
        break;
        case 0x05 : {
            lamp1["value"] = 0 ;
            lamp2["value"] = 1 ;
            lamp3["value"] = 0 ;
            lamp4["value"] = 1 ;
        }
        break;
        case 0x06 : {
            lamp1["value"] = 1 ;
            lamp2["value"] = 0 ;
            lamp3["value"] = 0 ;
            lamp4["value"] = 1 ;
        }
        break;
        case 0x07 : {
            lamp1["value"] = 0 ;
            lamp2["value"] = 0 ;
            lamp3["value"] = 0 ;
            lamp4["value"] = 1 ;
        }
        break;
        case 0x08 : {
            lamp1["value"] = 1 ;
            lamp2["value"] = 1 ;
            lamp3["value"] = 1 ;
            lamp4["value"] = 0 ;
        }
            break;
        case 0x09 : {
            lamp1["value"] = 0 ;
            lamp2["value"] = 1 ;
            lamp3["value"] = 1 ;
            lamp4["value"] = 0 ;
        }
            break;
        case 0x0a : {
            lamp1["value"] = 1 ;
            lamp2["value"] = 0 ;
            lamp3["value"] = 1 ;
            lamp4["value"] = 0 ;
        }
            break;
        case 0x0b : {
            lamp1["value"] = 0 ;
            lamp2["value"] = 0 ;
            lamp3["value"] = 1 ;
            lamp4["value"] = 0 ;
        }
            break;
        case 0x0c : {
            lamp1["value"] = 1 ;
            lamp2["value"] = 1 ;
            lamp3["value"] = 0 ;
            lamp4["value"] = 0 ;
        }
            break;
        case 0x0d : {
            lamp1["value"] = 0 ;
            lamp2["value"] = 1 ;
            lamp3["value"] = 0 ;
            lamp4["value"] = 0 ;
        }
            break;
        case 0x0e : {
            lamp1["value"] = 1 ;
            lamp2["value"] = 0 ;
            lamp3["value"] = 0 ;
            lamp4["value"] = 0 ;
        }
            break;
        case 0x0f : {
            lamp1["value"] = 0 ;
            lamp2["value"] = 0 ;
            lamp3["value"] = 0 ;
            lamp4["value"] = 0 ;
        }
            break;
    }
    console.log ('------- These are lamps : ');
    console.log(lamp1["value"]);
    console.log(lamp2["value"]);
    console.log(lamp3["value"]);
    console.log(lamp4);

    res.send([lamp1,lamp2,lamp3,lamp4]);
});
router.get('/changeData',function (req,res) {
    // if(lamp2["value"]===1)
    // {
    //     lamp2["value"]=0;
    // }
    // else{
    //     lamp2["value"]=1;
    // }
    // res.send(lamp2);
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

var temporary ;

router.get ('/lamp1on',function (req,res){
    var temp1 = output % 2 ;
    if (temp1 == 1) {
        temporary = output;
    }
    if (temp1 == 0) {
        temporary =output+1 ;
    }
    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = temporary;
    writeAndDrain(buffer,function () {});

});
router.get ('/lamp1off',function (req,res){
    var temp1 = output % 2 ;
    if (temp1 == 1) {
        temporary = output - 1;
    }
    if (temp1 == 0) {
        temporary =output ;
    }
    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = temporary;
    writeAndDrain(buffer,function () {});
});

router.get ('/lamp2on',function (req,res){
    var temp1 = output >> 1  ;
    temp1 = temp1 % 2 ;
    if (temp1 == 1) {
        temporary =output;
    }
    if (temp1 == 0) {
        temporary =output +2 ;
    }
    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = temporary;
    writeAndDrain(buffer,function () {});


});
router.get ('/lamp2off',function (req,res){
    var temp1 = output >> 1  ;
    temp1 = temp1 % 2 ;
    if (temp1 == 1) {
        temporary =output - 2 ;
    }
    if (temp1 == 0) {
        temporary =output  ;
    }
    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = temporary;
    writeAndDrain(buffer,function () {});





});
router.get ('/lamp3on',function (req,res){
    var temp1 = output >> 2  ;
    temp1 = temp1 % 2 ;
    if (temp1 == 1) {
        temporary =output;
    }
    if (temp1 == 0) {
        temporary = output + 4;
    }
    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = temporary;
    writeAndDrain(buffer,function () {});





});
router.get ('/lamp3off',function (req,res){
    var temp1 = output >> 2  ;
    temp1 = temp1 % 2 ;
    if (temp1 == 1) {
        temporary = output - 4;
    }
    if (temp1 == 0) {
        temporary = output;
    }
    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = temporary;
    writeAndDrain(buffer,function () {});





});
router.get ('/lamp4on',function (req,res){
    var temp1 = output >> 3  ;
    temp1 = temp1 % 2 ;
    if (temp1 == 1) {
        temporary = output;
    }
    if (temp1 == 0) {
        temporary = output +8 ;
    }
    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = temporary;
    writeAndDrain(buffer,function () {});





});
router.get ('/lamp4off',function (req,res){
    var temp1 = output >> 3  ;
    temp1 = temp1 % 2 ;
    if (temp1 == 1) {
        temporary = output - 8;
    }
    if (temp1 == 0) {
        temporary = output ;
    }
    function writeAndDrain (data, callback) {
        port.write(data);
        port.drain(callback);
    }
    var buffer = new Buffer(3);
    buffer[0] = 0x0D;
    buffer[1] = 0x00;
    buffer[2] = temporary;
    writeAndDrain(buffer,function () {});





});



router.get('/serialpf',function (req,res) {

    console.log('new adad recieved',req.body.number) ;

});


// router.get('/serialpf',function (req,res) {
//
//     console.log('new request recieved') ;
//     var buffer = new Buffer(3);
//     buffer[0] = 0x0D;
//     buffer[1] = 0x00;
//     buffer[2] = req.body.number;
//     console.log('man ghable write am');
//     // port.write(buffer, function(err) {
//     //    if (err) {
//     //        return console.log('Error on write: ', err.message);
//     //     }
//     //     console.log('message written');
//     //  });
//     writeAndDrain ( buffer, function (){
//         port.flush(function (err){
//             console.log('write kardam age error bood  ',err);
//         })
//     });
//     console.log('man bade write am');
// // Open errors will be emitted as an error event
//
//     console.log("serialdone")
//     res.send(true);
// });

