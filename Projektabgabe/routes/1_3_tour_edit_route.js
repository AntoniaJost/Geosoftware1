const express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

//MongoConnect
const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client
const dbName = 'Stadttour' // database name
const collectionName = 'neueTouren' // collection name



//Get Router 
router.get('/', function(req, res, next)
{
    res.render('1_3_tour_edit', {title: 'Edit'})
}); 

//Post Router 
router.post('/edit', function(req, res, next) 
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

module.exports = router; 