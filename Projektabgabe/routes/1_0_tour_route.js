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

  try{  //verursacht, dass /add nicht mehr geladen wird

    var touren = client.db("Stadttour");
    let tour = await touren.collection("neueTouren").findOne({"_id" : new mongo.ObjectId(routeID)});
    console.log(tour);
    let tours = await touren.collection("neueTouren").find({}).toArray();
  
    res.render("1_tour", {meineTour: tour, tours: tours}) 
  

  } catch(e){
    res.status(500);
    res.send(e)
  }
})


module.exports = router; 