'use strict'

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');

const app = express()
const port = 8000
var path = ''

app.use(bodyParser.json())

app.get('/pets/:id', function(req, res) {
  console.log(req.params.id)
  fs.readFile('pets.json', 'utf8', function (err, data){
    if (err) {
      console.error(err.message)
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.parse(data)[req.params.id])
  })
});

app.get('/pets', function(req, res) {
  fs.readFile('pets.json', 'utf8', function (err, data){
    if (err) {
      console.error(err.message)
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.parse(data)[req.params.id])
  })
});

app.post('/pets', function(req, res){
  req.body.age = Number(req.body.age)
  fs.readFile('pets.json', 'utf8', function (err, data) {
    if (err) {
      console.error(err.message)
    }
    let existingPets = JSON.parse(data)
    existingPets.push(req.body)
    console.log(JSON.stringify(existingPets))

    fs.writeFile('pets.json', JSON.stringify(existingPets), function (err) {
      if (err) {
        console.error(err.message)
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(req.body))
    })

  })
})

// app.use(function(req, res) {
//   res.sendStatus(404);
// });

app.listen(port, function() {
  console.log(`listening on port`, port)
})
//module.exports = server;
