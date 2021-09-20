//Hier befinden sich alle Router für /tour/...
var express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client

var objectID; 

/**
 * GET Router für tour page
 */
router.get('/', async function(req, res, next)
{
  await client.connect();

  var touren = client.db("Stadttour");


  //Findet alle "großen" Elemente der Datenbank
  let documents = await touren.collection("neueTouren").find({}).toArray(); 

  console.log(documents);

  res.render("1_tour", {tours: documents});

});

/**
 * Router, der ID der gewählten Tour abfängt und diese auf die Karte bringt
 */
router.get('/:routenID', async (req,res,next) => {
  await client.connect();
  let routeID = req.params.routenID;
  
  try{  

    var touren = client.db("Stadttour");

    //Findet die eine ausgewählte Tour
    let tour = await touren.collection("neueTouren").findOne({"_id" : new mongo.ObjectId(routeID)});
    console.log(tour);

    //Findet erneut alle Touren, damit Button weiterhin funktioniert
    let tours = await touren.collection("neueTouren").find({}).toArray();
    console.log("TOURS" + tours);
  
    res.render("1_tour", {meineTour: tour, tours: tours}) 
  
  } catch(e){
    res.status(500);
    res.send(e)
  }
})

/**
 * GET Router für tour/add/add
 * Da /:routenID leider alles nach /tour abfängt, muss hier /add/add 
 * statt nur /add in Rücksprache mit Auriol verwendet werden
 */
router.get('/add/add', function(req, res, next)
{
    res.render('1_1_tour_add', {title: 'Touren'})
}); 

/**
 * POST Router für tour/add/add
 * Fügt den Input aus /add der Datenbank hinzu 
 */
router.post('/add/add/details', function(req, res, next)
{
    var route1 = req.body.inputGeojson;
    var route = JSON.parse(route1); 
    console.log("Test1: ", route); 
 
    client.connect(function(err, client) 
  {
    assert.equal(null, err)
    console.log('Connected successfully to server')
    const db = client.db("Stadttour")
    const collection = db.collection("neueTouren")
  
    //Insert the document in the database 
    collection.insertOne(route, function(err, result)
    {
      console.log("Test1"+result);
      assert.equal(err, null)
      console.log(result)
      console.log(`Inserted ${result.insertedCount} document into the databse`)
      console.log("result: ", JSON.stringify(result.insertedId))
      objectID = JSON.stringify(result.insertedId)
      var newObjectID = objectID.slice(1, -1) 
      console.log("objectID: ", objectID)

      res.render('1_2_tour_details', {data: newObjectID})      
    })
  })
})

/**
 * GET Router für tour/add/add/details
 */
router.get('/add/add/details', function(req, res, next)
{
    var route = req.body.inputGeojson; 
    var routeNew = JSON.parse(route)

    res.render("1_2_tour_details");
}); 

/**
 * Router für das Hinzufügen von Objekten über das Formular 
 * Problem: Koordinaten werden nicht als Objekt sondern String erkannt.
 */
router.post('/add/add/success/formular', function(req, res, next)
{
  //res.send("TEST")
  console.log("Test!!!")

  var name = req.body.name; 
  //var geojson = req.body.geojson; 
  //var coordinates = req.body.coordinates; 
  var url = req.body.url; 
  var beschreibung = req.body.description; 
  var coordinates2 = 
  [
    [
      7.614351511001586,
      51.96711218674612
    ],
    [
      7.6143890619277945,
      51.967251000369984
    ],
    [
      7.615075707435608,
      51.96729727148237
    ],
    [
      7.6153600215911865,
      51.96712871220007
    ],
    [
      7.615118622779846,
      51.966930406350436
    ],
    [
      7.615376114845275,
      51.96710557656284
    ],
    [
      7.617065906524659,
      51.9663619247184
    ]]
  
  var coordinates = req.body.coordinates //Auriol fragen, wie die Koordinaten als Objekt dargestellt werden
  var a = JSON.stringify(coordinates)
  console.log("coordinates: ", typeof a)
  var coordinatesParsed = JSON.parse("["+a+"]"); 
  //JSON.parse(coordinates)
  
  console.log("Geparste Koordinaten: ", JSON.stringify(coordinates))
  
  console.log("Koordinaten var b: ", coordinatesParsed)

  let geoJson = 
    {
      "type": "FeatureCollection", 
      "features": [
        {
          "type": "Feature", 
          "properties": {
            "Name": name, 
            "URL": url, 
            "Beschreibung": beschreibung
          }, 
          "geometry" : {
            "type": "Polygon", 
            "coordinates": coordinatesParsed
          }
        }
      ]
    }

  //JSON.parse(geoJson)

  console.log("Geojson: ", geoJson.features[0].properties)
  console.log("ganzes GeoJSON: ", geoJson)

  
  client.connect(function (err, client) {

    assert.equal(null, err)
    console.log('Connected successfully to server')
    const db = client.db("Stadttour")
    const collection = db.collection("neueTouren")
    
    collection.insertOne(geoJson, function(err, result)
    {
      console.log("Result: ",result);
      assert.equal(err, null)
    })

  })

  res.render("1_2_2_success"); 
})


/**
 * POST Router für tour/add/add/details/success/:objectID
 * Fuegt der neu erstellten Tour einen Namen, eine URL und eine Beschreibung hinzu.
 */
router.post('/add/add/details/success/:objectID', function(req, res, next)
{
  console.log(req.body)

  var neuerName = req.body.name; 
  var neueUrl = req.body.url; 
  var neueBeschreibung = req.body.beschreibung; 


  client.connect(function (err, client) {

    assert.equal(null, err)
    console.log('Connected successfully to server')
    const db = client.db("Stadttour")
    const collection = db.collection("neueTouren")
    var routeID = req.params.objectID; //routenID muss noch irgendwoher geholt werden


      collection.updateOne({"_id": new mongo.ObjectId(routeID)}, {"$set":{"features.$[].properties.Name": neuerName}}, function(err, result)
        {
          console.log("result: ", result);
        })
       
      collection.updateOne({"_id": new mongo.ObjectId(routeID)}, {"$set":{"features.$[].properties.URL": neueUrl}}, function(err, result)
        {
          console.log(result);
        })

      collection.updateOne({"_id": new mongo.ObjectId(routeID)}, {"$set":{"features.$[].properties.Beschreibung": neueBeschreibung}}, function(err, result)
        {
          console.log(result);
        })   
  })


  res.render('1_2_2_success', {title: 'Success'})
}); 


/**
 * GET Router für tour/edit/edit
 * Anmerkung siehe add/add
 */
router.get('/edit/edit', async function(req, res, next)
{
  await client.connect();

  var touren = client.db("Stadttour");
    //var allElements = db.getCollection()
    //let tour = await touren.collection("neueTouren").findOne({"_id" : new mongo.ObjectId(routeID)})

    //Gibt alles aus der Datenbank aus 
   let data = await touren.collection("neueTouren").find({}).toArray();

   console.log(data)

    res.render('1_3_tour_edit', {touren: data}) //{touren: data},
}); 

/**
 * Get Router um das ausgewählte Element zu bearbeiten
 * Ermöglicht die Detaeilansicht zur Bearbeitung des in der Datenbank gespeicherten Elements
 */
router.post("/edit/edit/", function(req, res, next)
{
  console.log("Test ausgeführt!")
  var data = req.body.valueToEdit; 
  console.log(req.body.valueToEdit)
  console.log("data: " , data)
  res.render('1_3_1_edit_details', {inputData: data})
}); 


/**
 * POST Router um das ausgewählte Element in der Datenbank zu updaten
 */
router.post("/edit/edit/succed/:inputData", function(req, res, next) 
{
  console.log("inpuData Router")

  var neuerName = req.body.name; 
  var neueUrl = req.body.url; 
  var neueBeschreibung = req.body.beschreibung; 
  var data = req.params.inputData; 
  console.log("data: ", data)


  client.connect(async function (err, client) {

    assert.equal(null, err)
    console.log('Connected successfully to server')
    const db = client.db("Stadttour")
    const collection = db.collection("neueTouren")

      collection.updateOne({"features[].properties.Name": data}, {"$set":{"features.$[].properties.Name": neuerName}}, function(err, result)
        {
          console.log("result: ", result);
        })
       
      collection.updateOne({"features[].properties.Name": data}, {"$set":{"features.$[].properties.URL": neueUrl}}, function(err, result)
        {
          console.log(result);
        })

      collection.updateOne({"features[].properties.Name": data}, {"$set":{"features.$[].properties.Beschreibung": neueBeschreibung}}, function(err, result)
        {
          console.log(result);
        })   
  })

  res.render('1_2_2_success', {title: 'Success'})
})

/**
 * GET Router für tour/edit/edit/delete
 */
router.post('/edit/edit/delete', function(req, res, next)
{
  console.log("Test: ", req.body)
    res.render('1_2_3_delete', {title: 'Delete'})
}); 

/**
 * POST Router für tour/edit/edit/delete
 * Ermöglicht das Löschen einer Tour/Sehenswürdigkeit
 */
router.post('/edit/edit/delete/:toEdit', function (req, res, next) {

    //var data = req.body.ID; //Fehlt noch bzw. noch nicht definiert
    let data = req.params.toEdit;

    client.connect(async function(err, client) {
        assert.equal(null, err)
        console.log('Connected successfully to server')
        const db = client.db("Stadttour")
        const collection = db.collection("neueTouren")

        //Findet die eine ausgewählte Tour
        let zuLoeschendeTour = await db.collection("neueTouren").findOne({"Name" : data});
        console.log("zuLoeschendeTour: ", zuLoeschendeTour)

      /** 
        collection.deleteOne({nummer: data}, function(err, results) {
                assert.equal(err, null); 
        })
        */
        res.render('1_2_3_1_delete_completed');
    })
})

module.exports = router; 