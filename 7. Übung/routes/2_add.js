var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')


const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'Routes' // database name --> muss noch geändert werden
const collectionName = 'newRoutes' // collection name --> muss noch geändert werden 

/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('2_add', { title: 'Add your route to the datatbase!' });
});

//Insert new data
router.post('/newroute', function(req, res, next) 
{
  console.log("A new route has been added")
  console.log(req.body)
  let route = JSON.parse(req.body.rgeojson)

  
  //Connect to the mongodb database afterwards, insert one new element 
  client.connect(function(err)
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
      //console.log(result)
      console.log(`Inserted ${result.insertedCount} document into the databse`)
      res.render('2_add_notification', {title: 'Addition completed', data: route})
    })

  })


})

router.delete('/add', (req, res) => {
  var id = req.params.id; 
  var collection = db.get().collection('newRoutes')

  collection.deleteOne({_id: new mongo.ObjectId(id)}, function(err, results) {
      console.log(err); 
  }); 

  res.json({ success: id })
})

module.exports = router;