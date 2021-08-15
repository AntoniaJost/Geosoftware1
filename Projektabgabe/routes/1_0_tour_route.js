var express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client

router.get('/', function(req, res, next)
{
    res.render("1_tour");
    var resultArray = [];
    client.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('touren').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null,err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('1_tour', {items: resultArray})
        });
    });
});     

module.exports = router; 