var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'OBFS Framework visual configuration panel',
        model_one_title: 'Telemetry Model',
        model_two_title: 'FSM Model',
    });
});

module.exports = router;
