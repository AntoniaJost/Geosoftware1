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

  var search1 = client.db("Stadttour"); //var touren
  
  //let query = {"Name" : search};
  //let query = 'Schloss Münster' 
  //var id = "611e1e1918dc757804906d08"; 

  let routen = await search1.collection("neueTouren").find({}).toArray();
  //console.log("Touren4: " + routen[0].features)
  //routen.forEach(element => console.log(element.features.filter(toBj => toBj.properties.Name == query)))
  var passendeTourObjekte = []
  routen.forEach(element => returnRelevantElement(element, passendeTourObjekte, query))

  console.log("Ergebnis: " + passendeTourObjekte)

  passendeTourObjekte.forEach(element => console.log(element[0]))

  //let tour = await search1.collection("neueTouren").findOne({});
  //console.log(tour.features);

  //var tourObjekte = tour.features 
  //var passendeTourObjekte = tourObjekte.filter(toBj => toBj.properties.Name =="Schloss Münster")

  //console.log(passendeTourObjekte);

  /*let tours = await search1.collection("neueTouren").find(query).toArray();

  let findOne = await search1.collection("neueTouren").find(query).toArray() //"$neueTouren": {"$search": req.body.searchid} oder searchid})
  console.log("TEST Output: " + tour);*/

  res.render('3_search', {passendeTourObjekte}) //;{searchOutput : findOne}
})

let returnRelevantElement = function (element, passendeTourObjekte, query) {   
  var v = element.features.filter(toBj => toBj.properties.Name == query) 
  //console.log(v);
  if (v.length != 0) {
    passendeTourObjekte.push(v) 
  }
  
} 

/*router.get('/search/:search', async (req,res,next) =>{ //:search gibt es nicht... router.post?

  await client.connect();
  const search = req.query;

  try {
    var search1 = client.db("Stadttour"); //var touren
          
    let findOne = await search1.collection("neueTouren").findOne({  $text: {$search: search} } ) //"$neueTouren": {"$search": req.body.searchid} oder searchid})
    console.log(findOne);

    res.render('3_search', {searchOutput : findOne});
  } catch(e) {
    res.status(500);
    res.send(e)
  }
})
*/
  
module.exports = router; 