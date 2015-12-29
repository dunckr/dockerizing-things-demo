const sockjs = require('sockjs')
const redis = require('redis')
const os = require('os')

const host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.01'
const port = process.env.REDIS_PORT_6379_TCP_PORT || 6379
const sockjs_opts = {
  sockjs_url: 'http://cdn.sockjs.org/sockjs-0.3.min.js'
}

module.exports = (server) => {
  const publisher = redis.createClient(port, host)
  const sockjsChat = sockjs.createServer(sockjs_opts)
  sockjsChat.on('connection', (conn) => {
    const browser = redis.createClient(port, host)
    const hostname = os.hostname()
    browser.subscribe('chat_channel')

    browser.on('message', (channel, message) => {
      conn.write(`${hostname} ${message}`)
    })

    conn.on('data', (message) => {
      publisher.publish('chat_channel', message)
    })
  })

  sockjsChat.installHandlers(server, {
    prefix: '/chat'
  })
}
