const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render('1_3_tour_edit', {title: 'Edit'})
}); 

module.exports = router; 