const express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
const assert = require('assert')


const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client
const dbName = 'Touren' // database name
const collectionName = 'neueTouren' // collection name

router.get('/', function (req,res,next)
{
  res.render('3_search', {title: 'Suche'})
})


router.post('/search/:searchid', async (req,res,next) =>{

  await client.connect();
  searchid = req.params.id;

  try {
    var search = client.db("Stadttour"); //var touren
          
    let findOne = await search.collection("neueTouren").findOne({"name" : 'Klassische Touri-Tour'}) //"$neueTouren": {"$search": req.body.searchid} oder searchid})
    console.log(findOne);

    res.render('3_search', {searchOutput : findOne}); // data: docs[0].features  -> fehlt eigentlich, aber verursacht error

  } catch(e) {
    res.status(500);
    res.send(e)
  }
})

  
module.exports = router; 