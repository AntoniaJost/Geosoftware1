//Hier befinden sich alle Router für /tour/...
var express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client

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
    console.log("Test1"+route); 
 
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
      res.render('1_2_tour_details')      
    })
  })
})

/**
 * GET Router für tour/add/add/details
 */
router.get('/add/add/details', function(req, res, next)
{
    res.render("1_2_tour_details");
}); 


/**
 * GET Router für tour/add/add/details/success
 */
router.get('/add/add/details/success', function(req, res, next)
{
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
 * POST Router für edit/edit
 * Ermöglicht das Bearbeiten der in der Datenbank gespeicherten Daten
 */
router.post('/edit/edit', function(req, res, next) 
{
    var data1 = req.body.id1; //Tour die geändert werden soll (ID muss noch in der pug hinzugefügt werden)
    var data2 = req.body.id2; //Neue Tour (ID muss noch in der pug hinzugefügt werden)

    console.log(data1)
    console.log(data2)

    client.connect(function(err, client) {
        assert.equal(null, err)
        console.log('Connected successfully to server')
        const db = client.db("Stadttour")
        const collection = db.collection("neueTouren")

        //Ob wir nun nummer,name oder sonst was wählen, müssen wir noch beim Hinzufügen in die DB entscheiden
        collection.updateOne({nummer: data1}, {$set:{nummer: data2}}, function(err, result) {
            assert.equal(err, null)
            assert.equal(1, result.result.ok)
        })

        res.render('1_3_tour_edit')
    })
})

/**
 * GET Router für tour/edit/edit/delete
 */
router.get('/edit/edit/delete', function(req, res, next)
{
    res.render('1_2_3_delete', {title: 'Delete'})
}); 

/**
 * POST Router für tour/edit/edit/delete
 * Ermöglicht das Löschen einer Tour/Sehenswürdigkeit
 */
router.post('/edit/edit/delete', function (req, res, next) {

    var data = req.body.ID; //Fehlt noch bzw. noch nicht definiert

    client.connect(function(err, client) {
        assert.equal(null, err)
        console.log('Connected successfully to server')
        const db = client.db("Stadttour")
        const collection = db.collection("neueTouren")


        collection.deleteOne({nummer: data}, function(err, results) {
                assert.equal(err, null); 
        })

        res.render('1_2_tour_details');
    })
})

module.exports = router; 