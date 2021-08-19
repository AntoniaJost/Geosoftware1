var express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client

router.get('/', async function(req, res, next)
{
  await client.connect();

  var touren = client.db("Stadttour");

  let documents = await touren.collection("neueTouren").find({}).toArray();

  console.log(documents);

  res.render("1_tour", {tours: documents});

});

router.get("/:routeID", (req,res,next) => {
  const routeID = req.params.routeID;
  if (routeID) {
    res.send(routeID)
  } else{
    res.status(404).send();
  }
})

module.exports = router; 