const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render('1_1_tour_add', {title: 'Touren'})
}); 

module.exports = router; 