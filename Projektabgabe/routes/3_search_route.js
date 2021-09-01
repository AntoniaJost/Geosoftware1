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

router.post('/', async function(req, res, next) {
  console.log("Test");
  console.log(req.body.search2);

  client.connect();

  let query = req.body.search2;

  var search1 = client.db("Stadttour"); 

  let routen = await search1.collection("neueTouren").find({}).toArray();

  var passendeTourObjekte = []
  routen.forEach(element => returnRelevantElement(element, passendeTourObjekte, query))

  console.log("Ergebnis: " + passendeTourObjekte)

  passendeTourObjekte.forEach(element => console.log(element[0])) //Output hiervon muss {output: passendeTourObjekte} ersetzen -> Wie speichert man Inhalt von forEach -> push??

  res.render('3_search', {output: passendeTourObjekte})
})

let returnRelevantElement = function (element, passendeTourObjekte, query) {   
  var v = element.features.filter(toBj => toBj.properties.Name == query) 
  if (v.length != 0) {
    passendeTourObjekte.push(v) 
  }
  
} 
  
module.exports = router; 