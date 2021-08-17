var express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client



MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Stadttour");
    //Find all documents in the customers collection:
    dbo.collection("neueTouren").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
    

  router.get('/', function(req, res, next)
{
    res.render("1_tour");
    res.json(result);
    res.send(result);
    res.render(result);
});     


module.exports = router; 