
let fs = require('fs')
const path = require('path')

const express = require('express');
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan');

app.use(bodyParser.json())
app.disable('x-powered-by')
app.use(morgan('short'));

let port = 8000
let file = 'pets.json'
let filePath = path.join(__dirname, file)

app.get('/pets', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, petsJSON) => {
    res.send(JSON.parse(petsJSON))
  })
})
app.get('/pets/:id', (req, res, next) => {
  fs.readFile(filePath, 'utf8', (err, petsJSON) => {
    let pets = JSON.parse(petsJSON)
    let id = req.params.id
    if (id < 0 || Number.isNaN(id)) {
      return res.status(400).end('Bad Request')
    }
    else if (id > pets.length) {
      return res.status(404).end('Not Found')
    }
    else {
      let pet = pets[id]
      console.log(pets[id])
      res.send(pet)
    }
  })
});

app.post('/pets', function(req, res, next) {
  let {name, age, kind} = req.body
  let pet = {name, age, kind}
  pet.age = Number(pet.age)
  if (Number.isNaN(pet.age) || !pet.kind || !pet.name) {
    return res.status(400).end('Bad Request')
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

app.patch('/pets/:id', function(req, res, next) {
  fs.readFile(filePath, 'utf8', (err, petsJSON) => {
    if (err) {
      throw err
    }

    let pets = JSON.parse(petsJSON)
    let id = req.params.id
    if (!id || id < 0 || id > pets.length) {
      return res.sendStatus(404)
    }

    let age = Number(req.body.age)
    if (!Number.isNaN(age)) {
      pets[id].age = age
    }
    if (req.body.name) {
      pets[id].name = req.body.name
    }
    if (req.body.kind) {
      pets[id].kind = req.body.kind
    }
    let newFile = JSON.stringify(pets)

    fs.writeFile(filePath, newFile, (err) => {
      if (err) {
        throw error
      }
      res.send(pets[id])
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
      return res.sendStatus(404)
    }
    let pet = pets.splice(id, 1)[0]
    let newFile = JSON.stringify(pets)

    fs.writeFile(filePath, newFile, (err) => {
      if (err) {
        throw error
      }
      res.send(pet)
    })
  })
})

app.get('/*', (req, res, next) => {
  res.sendStatus(404)
})

app.use((_req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('listening on port', port)
})

module.exports = app
