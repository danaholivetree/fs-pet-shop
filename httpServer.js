//
const path = require('path')
const http = require('http')
const concat = require('concat-stream')
const fs = require('fs')
const url = require('url')
const petsPath = path.join(__dirname, 'pets.json')
const port = 8000;
let body = ''
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
    else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end(`Not Found`)
    }
  }
  if (req.method === 'POST') {

      req.on('data', function (chunk) {
          // console.log(data.toString())
          body += chunk.toString()

        })

      req.on('end', function() {

        fs.readFile(petsPath, 'utf8', function(err, data) {
          if (err) {
            throw err
          }
          var obj = JSON.parse(data)
          var newBody = JSON.parse(body)
          console.log(newBody.age,` age`)
          console.log(newBody.kind,` kind`)
          console.log(newBody.name,` name`)
          newBody.age = Number(newBody.age)

          if (newBody.age == NaN || newBody.kind == false || newBody.name == false) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'text/plain')
            res.end(`Bad Request`)
          }
          else {
            obj.push(newBody)
            var newObj = JSON.stringify(obj)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(newBody))

            fs.writeFile(petsPath, newObj, function(err){
              if (err) {
                throw err
              }
            })
          }
        })
      })
    }
  })

server.listen(port, function() {
  console.log('Listening on port', port)
})
module.exports = server;
