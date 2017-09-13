#!/usr/bin/env node
const path = require('path')
const http = require('http')
const fs = require('fs')
var node = path.basename(process.argv[0])
var file = 'pets.json'
var cmd = process.argv[2]

if (process.argv == 'git checkout -- pets.json' ) {
  fs.unlink('pets.json', function() {
    console.log('deleted pets.json')

  })
  // fs.openSync('pets.json', 'w')
}

if (!cmd) {
  console.error(`Usage: ${node} pets.js [read | create | update | destroy]`)
  process.exitCode = 1;
}

if (cmd === 'read') {

  fs.readFile(file, 'utf8', function(err,data) {
    if (err) {
      throw err
    }
    var obj = JSON.parse(data)
    if (process.argv.length === 3) {
      console.log(obj)
    }
    if (process.argv.length === 4) {

      if ((process.argv[3]) >= obj.length || process.argv[3] < 0) {
        console.error(`Usage: ${node} pets.js ${cmd} INDEX`)
      }
      else console.log(obj[process.argv[3]])
    }
  })
}

if (cmd === 'create') {

  if (process.argv.length < 6) {
    console.error(`Usage: ${node} pets.js ${cmd} AGE KIND NAME`)
    process.exit(1)
  }

  fs.readFile(file, 'utf8', function(err,data) {
    if (err) {
      throw err
    }
    var obj = JSON.parse(data)
    let newPet = {age: Number(process.argv[3]), kind: process.argv[4], name: process.argv[5]}

    obj.push(newPet)
    var newPetJSON = JSON.stringify(obj)

    fs.writeFile(file, newPetJSON, function(err){
      if (err) {
        throw err
      }
      console.log(newPet)
    })

  })
}


if (cmd === 'update') {
  if (process.argv.length < 7) {
    console.error(`Usage: node pets.js update INDEX AGE KIND NAME`)
    process.exit(1)
  }
  fs.readFile(file, 'utf8', function(err,data) {
    if (err) {
      throw err
    }
    var obj = JSON.parse(data)
    let updatePet = {age: Number(process.argv[4]), kind: process.argv[5], name: process.argv[6]}

    obj.splice(process.argv[3], 1, updatePet)
    var newPetJSON = JSON.stringify(obj)

    fs.writeFile(file, newPetJSON, function(err){
      if (err) {
        throw err
      }
      console.log(updatePet)
    })
  })
}

if (cmd === 'destroy') {
  if (process.argv.length < 4) {
    console.error(`Usage: node pets.js destroy INDEX`)
    process.exit(1)
  }
  fs.readFile(file, 'utf8', function(err,data) {
    if (err) {
      throw err
    }
    var obj = JSON.parse(data)

    let destroyed = obj.splice(process.argv[3], 1)
    var newPetJSON = JSON.stringify(obj)

    fs.writeFile(file, newPetJSON, function(err) {
      if (err) {
        throw err
      }
      console.log(destroyed[0])
    })
  })
}
