var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('videocalltest.html');
});
router.get('/admin', function(req, res) {
    res.send(true);
});
router.post('/admin', function(req, res) {

});
module.exports = router;

