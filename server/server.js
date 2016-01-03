var _port = process.env.PORT || 80;
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var socketServerBootstrap = require('./socketServer/bootstrap');
var sessionModule = require('../framework/redis/session');
//-------
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//-------
var userRoutes = require('./routes/demoUsers');
var indexRoutes = require('./routes/index');
var loginRoutes = require('./routes/login');

//--view engine--
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//--filters--
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use(cookieParser());
app.use(sessionModule.registry);
app.use((req, res, next)=> {
  "use strict";
  if (!req.session) {
    return next(new Error('session missed.'))
  }
  next()
});
//--routes--
app.use('/login', loginRoutes);
app.use('/', indexRoutes);
app.use('/users', userRoutes);
//--debug--
//app.use(logger('dev'));
app.use(require('./siteFilters/notFound'));
app.use(require('./siteFilters/serverError'));
//启动socketService
socketServerBootstrap(server);

server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof _port === 'string'
    ? 'Pipe ' + _port
    : 'Port ' + _port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.listen(_port, ()=> {
  console.log(`socket server listened on ${_port}`);
});
