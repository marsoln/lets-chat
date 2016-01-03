var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client = require('./base');

/**
 * register the redis-session-storage middleware for the server application
 * @type {*|Function}
 */
exports.registry = session({
  name: 's',
  store: new redisStore({
    client: client,
    //url: 'redis://127.0.0.1:6379',
    prefix: 'RS'  //redis session
  }),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
});