var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' //Connection to url 
const client = new MongoClient(url)     //mongodb cient 
const dbName = 'Routes'                 //Database name
const collectionName = 'newRoutes'      //Collection name

/* GET home page. */
router.get('/', function(req, res, next) {

  //Connect to the mongodb database and retrieve all docs 
  client.connect(function(err)
  {
    assert.equal(null, err)

    console.log('Connected successfully to the server')

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    //Find some routes
    collection.find({}).toArray(function(err, docs)
    {
      assert.equal(err, null); 
      console.log('Found the following routes...'); 
      res.render('4_index2', { title: 'Index' , data: docs});

    })
  })
});


module.exports = router;