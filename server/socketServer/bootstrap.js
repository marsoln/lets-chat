module.exports = function(server) {
  var io = require('socket.io')(server);
  //需要挂载的处理模块
  var _moduleHandlersToBeAmounted = ['chatroom'];

  io.on('connection', function(socket) {
    for (var i = 0; i < _moduleHandlersToBeAmounted.length; i++) {
      require(`./services/${_moduleHandlersToBeAmounted[i]}`)(socket);
    }
  });
};
