//
const path = require('path')
const http = require('http')
const fs = require('fs')
const url = require('url')
const petsPath = path.join(__dirname, 'pets.json')
// var node = path.basename(process.argv[0])
// var file = 'pets.json'
// var cmd = process.argv[2]
//
const port = 8000;
//const myURL = 'https://example.org/foo'
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
        console.log(`should be returning`,obj[0])
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
        console.log(`should be returning`,obj[1])
        res.end(JSON.stringify(obj[1]))
      })
    }
    else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end(`Not Found`)
    }
  }
})

//
server.listen(port, function() {
  console.log('Listening on port', port)
})
module.exports = server;
