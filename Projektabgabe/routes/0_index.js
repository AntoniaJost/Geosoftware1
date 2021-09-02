var express = require('express');
var router = express.Router();

/**
 * GET Router für Homepage 
 */
router.get('/', function(req, res, next) {
  res.render('0_index', { title: 'Homepage' });
});

module.exports = router;