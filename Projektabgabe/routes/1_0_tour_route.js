const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render('1_tour', {title: 'Touren'})
}); 

module.exports = router; 