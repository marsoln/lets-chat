const PORT = process.env.PORT || 80
let express = require('express')
let app = express()
let path = require('path')
let server = require('http').createServer(app)
let socketServerBootstrap = require('./socketServer/boot')
let sessionModule = require('../framework/redis/session')
let favicon = require('serve-favicon')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let routeMap = require('./routes/RouteMap')

// --view engine--
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/../public'))
app.use(favicon(__dirname + '/../public/favicon.ico'))

// --filters--
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(sessionModule.registry)
app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('session missed.'))
  }
  next()
})

routeMap.init(app)

// 启动socketService
socketServerBootstrap(server)

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})

server.listen(PORT, () => {
  console.log(`socket server listened on ${PORT}`)
})
