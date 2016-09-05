/**
 * 我一开始想把这里设计成多个socket服务的形式
 * 但是后来发现不能在子服务中优雅的处理过期的socket链接
 * 我需要设计模式!
 * to Redesign
 */
module.exports = function (server) {
  let io = require('socket.io')(server)
  // 需要挂载的处理模块
  let _moduleHandlersToBeAmounted = ['chatroom']

  io.on('connection', function (socket) {
    _moduleHandlersToBeAmounted.map(moduleName => {
      require(`./services/${moduleName}`)(socket)
    })
  })
}
