const express = require('express')
var router = express.Router(); 

router.get('/', function(req, res, next)
{
    res.render("1_tour");
    res.json(result);
    res.send(result);
    res.render(result);
}); 

module.exports = router; 