var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Visual modeling',
        model_one_title: 'Application',
        model_one_url: '/application',
        model_two_title: 'Telemetry Management',
        model_two_url: '/telemetry',
        model_three_title: 'Telecommand Management',
        model_three_url: '/telecommand',
        model_four_title: 'Manoeuvre Management',
        model_five_title: 'FDIR',
        model_six_title: 'FSM',
        model_seven_title: 'PUS',
        model_eight_title: 'Data Processing',
        model_nine_title: 'Mode Management',
        model_ten_title: 'Mode Management',
        model_eleven_title: 'Mode Management',
        model_twelve_title: 'Mode Management'
    });
});

module.exports = router;
