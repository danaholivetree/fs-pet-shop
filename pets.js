var fs = require('fs')
let file = 'pets.json'
let subc = process.argv[2]
let ind = process.argv[3]

if (process.argv === "git checkout -- pets.json") {
  fs.unlink(file, () => {
    console.log('reset pets.json')
  })
}

if (!subc) {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
}

if (subc === 'read') {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    if (process.argv.length < 4) {
      console.log(JSON.parse(data));
    }
    if (!ind) {
      console.error('Usage: node pets.js read INDEX')
    }
    else {
      console.log((JSON.parse(data))[ind])
    }
  })
}

if (subc === 'create') {
  if (process.argv.length < 6) {
    console.error('Usage: node pets.js create AGE KIND NAME')
    process.exit(1)
  }
  let age = Number(process.argv[3])
  let kind = process.argv[4]
  let name = process.argv[5]
  let newData = {age, kind, name}

  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err
    let pets = JSON.parse(data)
    pets.push(newData)
    let jsonFile = JSON.stringify(pets)
    fs.writeFile(file, jsonFile, (err, data) => {
      if (err) throw err
      console.log(newData)
    })
  })
}

if (subc === 'update') {
  if (process.argv.length < 7) {
    console.error('Usage: node pets.js update INDEX AGE KIND NAME')
    process.exit(1)
  }
  fs.readFile(file, 'utf8', (err, data) => {
    let pets = JSON.parse(data)
    if (!pets[ind]) {
      console.error('Usage: node pets.js update INDEX AGE KIND NAME')
      process.exit(1)
    }
    let age = Number(process.argv[4])
    if (isNaN(age)){
      console.error('Usage: node pets.js update INDEX AGE KIND NAME')
      process.exit(1)
    }

    let kind = process.argv[5]
    let name = process.argv[6]
    let newData = {age, kind, name}
    pets.splice(ind, 1, newData)
    let newFile = JSON.stringify(pets)

    fs.writeFile(file, newFile, (err, data) => {
      if (err) throw err
      console.log(newData)
    })
  })
}

if (subc === 'destroy') {
  if (process.argv.length < 4) {
    console.error('Usage: node pets.js destroy INDEX')
    process.exit(1);
  }
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err
    let pets = JSON.parse(data)
    if (!pets[ind]) {
      console.error('Usage: node pets.js destroy INDEX')
      process.exit(1)
    }
    let newData = pets.splice(ind, 1)
    let newFile = JSON.stringify(pets)
    fs.writeFile(file, newFile, (err, data) => {
      if (err) throw err
      console.log(newData[0])
    })
  })
}
