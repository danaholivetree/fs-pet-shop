'use strict'

var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser');

var app = express()
var port = 8000
var path = ''

app.use(bodyParser.json())


app.get('/pets/:id', function(req, res) {
  let index = req.params.id
  fs.readFile('pets.json', 'utf8', function (err, data){
    if (err) {
      console.error(err.message)
    }
    let info = JSON.parse(data)
    if (info[index]) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(info[index]))
    }
    else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`Not Found`)
    }
  })
});

app.get('/pets', function(req, res) {
  fs.readFile('pets.json', 'utf8', function (err, data){
    if (err) {
      console.error(err.message)
    }
    let info = JSON.parse(data)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(info))
  })
});

app.post('/pets', function(req, res){
  req.body.age = Number(req.body.age)

  if (isNaN(req.body.age) || req.body.kind == false || req.body.name == false) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain')
    res.end(`Bad Request`)
  }

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

app.use('*', function(req, res) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end(`Not Found`)
})


app.listen(port, function() {
  console.log(`listening on port`, port)
})
module.exports = app;
