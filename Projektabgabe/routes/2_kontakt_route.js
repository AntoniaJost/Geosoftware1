const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render('2_kontakt', {title: 'Kontakt'})
}); 

module.exports = router; 