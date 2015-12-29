const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 3000

server.listen(port, '0.0.0.0')

require('./lib/sockets')(server)

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html')
})
