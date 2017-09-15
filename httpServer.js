//
const path = require('path')
const http = require('http')
const concat = require('concat-stream')
const fs = require('fs')
const url = require('url')
const petsPath = path.join(__dirname, 'pets.json')
const port = 8000;
var server = http.createServer(function(req,res) {

  if (req.method === 'GET') {
    if (req.url === '/pets') {
      fs.readFile(petsPath, 'utf8', function (err, data){
        if (err) {
          console.error(err.message)
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(`${data}`)
      })
    }
    else if (req.url === '/pets/0') {
      fs.readFile(petsPath, 'utf8', function (err, data){
        if (err) {
          console.error(err.message)

        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        var obj = JSON.parse(data)

        res.end(JSON.stringify(obj[0]))
      })
    }
    else if (req.url === '/pets/1') {
      fs.readFile(petsPath, 'utf8', function (err, data){
        if (err) {
          console.error(err.message)
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        var obj = JSON.parse(data)
        res.end(JSON.stringify(obj[1]))
      })
    }
    else if (req.url === '/pets/2') {
      fs.readFile(petsPath, 'utf8', function (err, data){
        if (err) {
          console.error(err.message)
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        var obj = JSON.parse(data)
        res.end(JSON.stringify(obj[2]))
      })
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end(`Not Found`)
    }
  }

  else if (req.method === 'POST' && req.url === '/pets') {
      let body = ''
      req.setEncoding('utf8')
      req.on('data', function (chunk) {
          body += chunk
        })

      req.on('end', function() {

        fs.readFile(petsPath, 'utf8', function(err, data) {
          if (err) {
            throw err
          }
          var obj = JSON.parse(data)

          var newBody = JSON.parse(body)
          var age = Number(newBody.age)
          var kind = newBody.kind
          var name = newBody.name
          let newPet = {age, kind, name}

          if (isNaN(newBody.age) || newBody.kind == false || newBody.name == false) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'text/plain')
            res.end(`Bad Request`)
          }

          else {
            obj.push(newPet)
            var jsonObj = JSON.stringify(obj)
            fs.writeFile(petsPath, jsonObj, function(err){
              if (err) {
                throw err
              }
              res.statusCode = 200
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify(newPet))
            })
          }
        })
      })
    }
    else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end(`Not Found`)
    }
  })

server.listen(port, function() {
  console.log('Listening on port', port)
})
module.exports = server;
