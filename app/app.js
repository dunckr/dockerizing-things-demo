var express = require('express');
var sockjs = require('sockjs');
var http = require('http');
var redis = require('redis');
var os = require('os');

var host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.01';
var port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
var publisher = redis.createClient(port, host);

var sockjs_opts = {
  sockjs_url: 'http://cdn.sockjs.org/sockjs-0.3.min.js'
};

var sockjs_chat = sockjs.createServer(sockjs_opts);
sockjs_chat.on('connection', function(conn) {
  var host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.01';
  var port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
  var browser = redis.createClient(port, host);
  var hostname = os.hostname();
  browser.subscribe('chat_channel');

  browser.on('message', function(channel, message) {
    conn.write(hostname + ' ' + message);
  });

  conn.on('data', function(message) {
    publisher.publish('chat_channel', message);
  });
});

var app = express();
var server = http.createServer(app);

sockjs_chat.installHandlers(server, {
  prefix: '/chat'
});

var port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0');

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

module.export = app;
