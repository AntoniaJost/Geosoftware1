//KANN WEG

const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render('1_2_2_success', {title: 'Success'})
}); 

module.exports = router; 