const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render('1_2_3_delete', {title: 'Delete'})
}); 

router.post('/delete', function (req, res, next) {
    
})
module.exports = router; 