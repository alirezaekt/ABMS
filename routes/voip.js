var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('voip.html');
});

router.post('/voice', function(req, res) {
    var username = req.body.userId ;
    res.send(username + "  : kir :)))");
});
router.post('/video', function(req, res) {
    var userId = req.body.userId ;
    console.log(userId);

    res.send({gateway:{url:"http://192.168.137.93:8080/stream"}});
});
module.exports = router;

