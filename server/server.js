const PORT = 80;
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  server = require('http').createServer(app)
  ;

app
  //静态资源
  .use(express.static(__dirname + '/../public'))
  .use(bodyParser())
  .use(function (req, res, next) {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('X-Powered-By', '4.13.3');
    next();
  })
  .use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      error: err.message
    });
    next();
  })
  .use(function (err, req, res, next) {
    res.status(404);
    res.send({
      error: "Not Found"
    });
    next();
  })
  //.all('*', function (req, res, next) {
  //  res.header("Access-Control-Allow-Origin", "*");
  //  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  //  res.header("X-Powered-By", ' 3.2.1')
  //  res.header("Content-Type", "application/json;charset=utf-8");
  //  next();
  //})
;

/**
 * web api infomation
 */
//app.get('/api', function (req, res) {
//  res.send({
//    message: 'success',
//    links: {
//      'list': 'GET /api/users',
//      'get': 'GET /api/users/id',
//      'create': 'POST /api/users',
//      'update': 'PUT /api/users/id',
//      'delete': 'DELETE /api/users/id'
//    }
//  });
//});

//暴露demoUser的api
//require('./restfulApi/demoUserApi')(app);
//启动socketService
require('./socketServer/bootstrap')(server);

server.listen(PORT, ()=> {
  console.log(`socket server listened on ${PORT}`);
});
