const express = require('express')
const path = require('path')

const app = express()
const port = 5000

app.get('/test1', (req, res) => // get request mit definierter route
{
  res.send('Hello World!')
})

app.get('/test', (req, res) => 
{
  res.send('Das ist ein Test!')
})

//app.use(express.static('public')) // Zugriff auf den Ordner public, der die Übung 5 enthält (möglich mit Express)
//app.use('/public', express.static('public'))
//app.use('/static', express.static(path.join(__dirname, 'public')))


app.listen(port, () => 
{
  console.log(`App listening at http://localhost:${port}`)
})

