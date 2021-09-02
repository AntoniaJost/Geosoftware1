const express = require('express')
var router = express.Router(); 
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // create mongodb client
const dbName = 'Touren' // database name
const collectionName = 'neueTouren' // collection name


/**
 * GET Router für Search Seite
 */
router.get('/', function (req,res,next)
{
  res.render('3_search', {title: 'Suche'})
})


/**
 * POST Router für search aus Header
 */
router.post('/', async function(req, res, next) {

  client.connect();

  //Speichert Nutzer*in Eingabe in Variable query
  let query = req.body.search2;

  var search1 = client.db("Stadttour"); 

  //Findet alle in der Datenbank gespeicherten Touren
  let routen = await search1.collection("neueTouren").find({}).toArray();

  //Erstellen eines leeren Arrays für Ergebnis
  var passendeTourObjekte = []

  //Für jedes Element der Datenbank wird Funktion returnRelevantElement durchlaufen
  routen.forEach(element => returnRelevantElement(element, passendeTourObjekte, query))

  //erneute ForEach Schleife, um von Array Ebene auf Object Ebene zu  kommen
  passendeTourObjekte.forEach(foreachFunction); // alternativ: passendeTourObjekte.forEach(element => console.log(element[0])) 
  
  /**
   * @function foreachFunction
   * @description macht aus [object Object] einen zurückgebbaren String mit den richtigen Daten
   * @param element 
   * @param index 
   * @param arr 
   */
  function foreachFunction(element, index, arr) {
    arr[index] = JSON.stringify(element[0])
  }
  
  res.render('3_search', {output: passendeTourObjekte, query})
})

/**
 * @function returnRelevantElement
 * @description Überprüft für jedes Object des Arrays, ob der Name mit dem eingegebenen übereinstimmt
 *              und gibt es für diesen Fall zurück, bzw. pusht es in das Array
 * @param element jedes Element
 * @param passendeTourObjekte leeres Array von oben, in das die Ergebnisse gepusht werden
 * @param query Sucheingabe (muss mit als Parameter übergeben werden, weil Funktion außerhalb des Routers ist)
 */
let returnRelevantElement = function (element, passendeTourObjekte, query) {   
  var v = element.features.filter(toBj => toBj.properties.Name == query) 
  if (v.length != 0) {
    passendeTourObjekte.push(v) 
  }
  
} 
  
module.exports = router; 