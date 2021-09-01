//KANN WEG

const express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

//MongoConnect
const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client
const dbName = 'Stadttour' // database name
const collectionName = 'neueTouren' // collection name


router.get('/', function(req, res, next)
{
    res.render('1_2_3_delete', {title: 'Delete'})
}); 

router.post('/delete', function (req, res, next) {

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