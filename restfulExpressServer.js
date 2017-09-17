var express = require('express');
//var router = express.Router();
var app = express()

var fs = require('fs')
var path = require('path')
var url = require('url')
var port = 8000
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.disable('x-powered-by')
var file = 'pets.json'
var filePath = path.join(__dirname, file)

app.get('/pets', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, petsJSON) => {
    res.send(petsJSON)
  })
})
app.get('/:id', (req, res, next) => {

  console.log("the requested id is", req.params.id);
  res.send('R in CRUD');
});

app.post('/pets', function(req, res, next) {
  let {name, age, kind} = req.body
  let pet = {name, age, kind}
  pet.age = Number(pet.age)
  if (Number.isNaN(pet.age) || !pet.kind || !pet.name) {
    res.status(400).end('Bad Request')
  }
  fs.readFile(filePath, 'utf8', (err,petsJSON) => {
    let pets = JSON.parse(petsJSON)
    pets.push(pet)
    let newFile = JSON.stringify(pets)
    fs.writeFile(filePath, newFile, (err) => {
      res.send(pet)
    })
  })
})

app.put('/pets/:id', function(req, res, next) {
  fs.readFile(filePath, 'utf8', (err, petsJSON) => {
    if (err) {
      throw err
    }
    let pets = JSON.parse(petsJSON)
    let id = req.params.id
    if (!id || id < 0 || id > pets.length) {
      res.status(404).end('Not Found')
    }
    let name = req.body.name
    let age = Number(req.body.age)
    let kind = req.body.kind
    if (Number.isNaN(req.body.age) || !req.body.kind || !req.body.name) {
      res.status(400).end('Bad Request')
    }
    let pet = {age, kind, name}
    let deleted = pets.splice(id, 1, pet)
    let newFile = JSON.stringify(pets)
    fs.writeFile(filePath, newFile, (err) => {
      if (err) {
        throw error
      }
      res.send(JSON.stringify(deleted[0]))
    })
  })
})

app.delete('/pets/:id', function(req, res, next) {
  fs.readFile(filePath, 'utf8', (err, petsJSON) => {
    if (err) {
      throw err
    }
    let pets = JSON.parse(petsJSON)
    let id = req.params.id
    if (!id || id < 0 || id > pets.length) {
      res.status(404).end('Not Found')
    }
    let deleted = pets.splice(id, 1)
    let newFile = JSON.stringify(pets)
    fs.writeFile(filePath, newFile, (err) => {
      if (err) {
        throw error
      }
      res.send(JSON.stringify(deleted[0]))
    })
  })
})

app.listen(port, () => {
  console.log('listening')
})

module.exports = app
