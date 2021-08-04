const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render('1_2_tour_details', {title: 'Details'})
}); 

module.exports = router; 