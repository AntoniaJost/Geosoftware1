const express = require('express'); 
var router = express.Router(); 

router.get('/', function(req, res, next){
    res.render('0_index', {title: 'Test Page' })
    //res.send("hallo ich funktioniere")
}); 




module.exports = router; 