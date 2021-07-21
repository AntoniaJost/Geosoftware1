// template to add to and retrieve documents from a MongoDB database
const MongoClient = require('mongodb').MongoClient
const assert = require('assert') //Prüft ob zwei Werte gleich sind

const url = 'mongodb://localhost:27017' // connection URL

const client = new MongoClient(url) // mongodb client

const dbName = 'Routes' // database name

const collectionName = 'newRoutes' // collection name

// Use connect method to connect to the server
client.connect(function(err) 
{
  assert.equal(null, err)

  console.log('Connected successfully to server')

  const db = client.db(dbName)
  /*
    // create a collection 
    db.createCollection(collectionName, function(err, res)
    {
        if (err) throw err
        console.log("Collection created!")
    })
  */
  const collection = db.collection(collectionName)

  // Mit Beispielroute im GeoJson Format
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

  // insert new documents in my collection
  insertDocuments(db, collection, data, function()
  {
    console.log("Insertion operation done")
    //client.close()
  })

  countRows (collection)

  findDocuments(db, collection, function()
  {
    console.log("Closing the client...")
    client.close()
  })

})


const insertDocuments = function(db, collection, data, callback) 
{
    // Insert some documents
    collection.insertMany(data, function(err, result) 
    {
      assert.equal(err, null)
      assert.equal(1, result.result.ok)
      //console.log(result)
      console.log(`Inserted ${result.insertedCount} documents into the collection`)
      callback(result)
    })
}

// find all documents in a collection
const findDocuments = function(db, collection, callback) 
{

    // Find some documents
    collection.find({}).toArray(function(err, docs) 
    {
      assert.equal(err, null);
      console.log('Found the following records');
      console.log(docs);
      callback(docs)
    })
}

// count the number of rows in a collection
const countRows = function(collection)
{
    // count the total number of elements in my collection
    collection.count(function (err, count) 
    {
        if (err) throw err
    
        console.log('Total Rows: ' + count)
    })

}