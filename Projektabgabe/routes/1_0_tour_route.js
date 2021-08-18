var express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client


// res.render(..) als callback der find-Methode
// get Endpunkt??
// asyn/ await??
// nur einmal res.render/send verwenden, sonst Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to
// -> aber wie dann 1_tour & und result senden??

router.get('/', function(req, res, next)
{

    res.render("1_tour");
    /*res.json(result);
    res.send(result);
    res.render(result);*/
});       

  router.get('/', function(req, res, next)
{

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var touren = db.db("Stadttour");
    //Find all documents in the customers collection:
    touren.collection("Stadttour").find({}.toArray(function(err, result) {
      if (err) {
        throw err;
      } else if (result.length) {
          console.log(result);
          res.send(result);
      } else {
          res.send('No documents found');
      }
      //console.log(result);
      db.close();
    }));
  });

});


module.exports = router; 