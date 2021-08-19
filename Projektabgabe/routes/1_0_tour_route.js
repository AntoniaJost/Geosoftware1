var express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
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

router.get('/:routeID', async (req,res,next) => {
  
  await client.connect();

  routeID = req.params.routeID;

  var touren = client.db("Stadttour");

  let documents = await touren.collection("neueTouren").findOne({"_id" : new mongo.ObjectId(routeID)});

  console.log(documents);

  res.send(documents); 
  //res.render("1_tour", {tours: documents}) //-> error cannot read property of undefinded
  
})

module.exports = router; 