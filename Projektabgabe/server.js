// SERVER.JS (orientiert an Github von Auriol 09/express+mongo+docker/serveranddb.js)

const express = require('express')
var router = express.Router()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const app = express() // create express app
const port = 3000

//const url = 'mongodb://localhost:27017' // connection URL
const url = 'mongodb://mongodbservice:27017' // connection URL
const client = new MongoClient(url) // create mongodb client
const dbName = 'Routes' // database name
const collectionName = 'NewRoutes' // collection name

// GET Homepage
router.get('/', function(req, res, next) {

// Use connect method to connect to the server
  client.connect(function(err) 
  {

    assert.equal(null, err)
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

// AKTUALISIEREN (ALTES BSP.) Mit Beispielroute im GeoJson Format
    const data = [
        {
        "name":"Route2",
        "type": "FeatureCollection",
        "features": [
            {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                [
                    10.48095703125,
                    52.07950600379697
                ],
                [
                    11.689453125,
                    50.21909462044748
                ],
                [
                    8.7451171875,
                    50.05008477838256
                ],
                [
                    7.888183593749999,
                    51.385495069223204
                ]
                ]
            }
            }
        ]
        }
    ]

    // Find some routes
    collection.find({}).toArray(function(err, docs)
    {
        assert.equal(err, null); 
        console.log('Found the following routes...'); 
        res.render('server.js', { title: 'Index' , data: docs});
    
    })

    // Insert data in the collection
    collection.insertMany(data, function(err, result) 
    {
      assert.equal(err, null)
      assert.equal(1, result.result.ok)
      //console.log(result)
      console.log(`Inserted ${result.insertedCount} documents into the collection`)
     
    })

    client.close()

    res.send('Some data has been added to the database!')

  })

});

module.exports = router; //evtl. vor client.close()?
   x
app.listen(port, () => 
{
  console.log(`App listening at http://localhost:${port}`)
})

