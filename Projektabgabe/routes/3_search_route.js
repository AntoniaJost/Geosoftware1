const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render('3_search', {title: 'Search'})
}); 

module.exports = router; 