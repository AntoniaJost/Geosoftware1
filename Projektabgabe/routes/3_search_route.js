const express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')


const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client
const dbName = 'Touren' // database name
const collectionName = 'neueTouren' // collection name

router.get('/', async (req,res,next) =>
{
  await client.connect();
  searchid = req.body.searchid;

  try {
    var search = client.db("Stadttour"); //var touren
    
    let findOne = await search.collection("neueTouren").findOne({
      "$neueTouren": {
        "$search": req.body.query
      }})
      //searchid}); //let tour Name:searchid
    console.log(findOne);

    res.render('3_search', {searchOutput : findOne}); // data: docs[0].features  -> fehlt eigentlich, aber verursacht error

  } catch(e) {
    res.status(500);
    res.send(e)
  }
})
  
module.exports = router; 

