const express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://mongodbservice:27017' // connection URL
const client = new MongoClient(url) // create mongodb client
const dbName = 'Routes' // database name
const collectionName = 'NewRoutes' // collection name

router.get('/', function(req, res, next)
{
    res.render('1_1_tour_add', {title: 'Touren'})
}); 

router.post('/newtour', function(req, res, next)
{
    let route = JSON.parse(req.body.inputGeojson);  
});

module.exports = router; 