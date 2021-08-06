const express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client
const dbName = 'Touren' // database name
const collectionName = 'neueTouren' // collection name


router.get('/', function(req, res, next)
{
    res.render('1_1_tour_add', {title: 'Touren'})
}); 

router.post('/details', function(req, res, next)
{
    console.log("Post kommt an");
    res.render("1_2_tour_details");
    let route = JSON.parse(req.body.inputGeojson); 
}),

MongoClient.connect(function(err) //hier habe ich client.connect zu MongoClient geändert (falls Fehler verursachen sollte)
  {
    assert.equal(null, err)

    console.log('Connected successfully to server')

    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    //Insert the document in the database 
    collection.insertOne(route, function(err, result)
    {
      assert.equal(err, null)
      assert.equal(1, result.result.ok)
      console.log(result)
      console.log(`Inserted ${result.insertedCount} document into the databse`)
      res.render('1_2_2_success', {title: 'Addition completed', data: route})
    })

  })




module.exports = router; 