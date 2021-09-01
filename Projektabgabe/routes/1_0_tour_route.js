var express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client

router.get('/', async function(req, res, next)
{
  await client.connect();

  var touren = client.db("Stadttour");

  let documents = await touren.collection("neueTouren").find({}).toArray();

  console.log(documents);

  res.render("1_tour", {tours: documents});

});

router.get('/:routenID', async (req,res,next) => {
  await client.connect();
  let routeID = req.params.routenID;
  //console.log(req.params.routenID)
  try{  //verursacht, dass /add nicht mehr geladen wird

    var touren = client.db("Stadttour");
    let tour = await touren.collection("neueTouren").findOne({"_id" : new mongo.ObjectId(routeID)});
    console.log(tour);
    let tours = await touren.collection("neueTouren").find({}).toArray();
    console.log("TOURS" + tours);
  
    res.render("1_tour", {meineTour: tour, tours: tours}) 
  

  } catch(e){
    res.status(500);
    res.send(e)
  }
})

router.get('/add/add', function(req, res, next)
{
    res.render('1_1_tour_add', {title: 'Touren'})
}); 


router.post('/add/add/details', function(req, res, next)
{

    //res.render("1_2_tour_details");
    var route1 = req.body.inputGeojson;
    var route = JSON.parse(route1); 
    console.log("Test1"+route); 
    //console.log(req.body.drawEvent);
    

    client.connect(function(err, client) 
  {
    assert.equal(null, err)
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
  
    
    //Insert the document in the database 
    collection.insertOne(route, function(err, result)
    {
      console.log("Test1"+result);
      assert.equal(err, null)
      //assert.equal(1, result.result.ok)
      console.log(result)
      console.log(`Inserted ${result.insertedCount} document into the databse`)
      res.render('1_2_tour_details')

      
    })


  })
})

router.get('/add/add/details', function(req, res, next)
{
    res.render("1_2_tour_details");
    res.json(result);
    res.send(result);
    res.render(result);
}); 


router.get('/add/add/details/success', function(req, res, next)
{
    res.render('1_2_2_success', {title: 'Success'})
}); 


router.get('/edit/edit', function(req, res, next)
{
    res.render('1_3_tour_edit', {title: 'Edit'})
}); 


router.post('/edit/edit', function(req, res, next) 
{
    var data1 = req.body.id1; //Tour die geändert werden soll (ID muss noch in der pug hinzugefügt werden)
    var data2 = req.body.id2; //Neue Tour (ID muss noch in der pug hinzugefügt werden)

    client.connect(function(err, client) {
        assert.equal(null, err)
        console.log('Connected successfully to server')
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        //Ob wir nun nummer,name oder sonst was wählen, müssen wir noch beim Hinzufügen in die DB entscheiden
        collection.updateOne({nummer: data1}, {$set:{nummer: data2}}, function(err, result) {
            assert.equal(err, null)
            assert.equal(1, result.result.ok)
            //console.log(result)
        })

        res.render('1_3_tour_edit')
    })
})


router.get('/edit/edit/delete', function(req, res, next)
{
    res.render('1_2_3_delete', {title: 'Delete'})
}); 

router.post('/edit/edit/delete', function (req, res, next) {

    var data = req.body.ID; //Fehlt noch bzw. noch nicht definiert

    client.connect(function(err, client) {
        assert.equal(null, err)
        console.log('Connected successfully to server')
        const db = client.db(dbName)
        const collection = db.collection(collectionName)


        collection.deleteOne({nummer: data}, function(err, results) {
                assert.equal(err, null); 
        })

        res.render('1_2_tour_details');
})

})

module.exports = router; 