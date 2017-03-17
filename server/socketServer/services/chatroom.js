'use strict'
let numUsers = '根本不知道几个' // 0
const SERVICE_NAME_PREFIX = 'chatroom-'
let logger = require('../../../framework/logger/Logger')
let socketPool = []

setInterval(() => {
  socketPool.filter(skt => !skt.user).forEach(socket => socket.broadcast.emit())
}, 3000)

let generateSocketInstance = function(socket) {
  logger('创建套接字')
  let __added = false
  socketPool[socketPool.length] = socket

  socket.on(`${SERVICE_NAME_PREFIX}new message`, function(data) {
    let msgData = {
      sender: socket.user,
      createTime: new Date(),
      message: data.message
    }
    socket.broadcast.emit(`${SERVICE_NAME_PREFIX}new message`, msgData)
  })

  // when the client emits 'add user', this listens and executes
  socket.on(`${SERVICE_NAME_PREFIX}add user`, function(userInfo) {

    logger(`${userInfo['name']} 进入聊天室`)

    if (__added) return

    // we store the username in the socket session for this client
    socket.user = userInfo
      // ++numUsers
    __added = true

    socket.emit(`${SERVICE_NAME_PREFIX}login`, {
      numUsers: numUsers
    })

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit(`${SERVICE_NAME_PREFIX}user joined`, {
      user: socket.user,
      numUsers: numUsers
    })
  })

  // when the client emits 'typing', we broadcast it to others
  socket.on(`${SERVICE_NAME_PREFIX}typing`, function() {
    socket.broadcast.emit(`${SERVICE_NAME_PREFIX}typing`, {
      user: socket.user,
      _id: socket.id
    })
  })

  // when the client emits 'stop typing', we broadcast it to others
  socket.on(`${SERVICE_NAME_PREFIX}stop typing`, function() {
    socket.broadcast.emit(`${SERVICE_NAME_PREFIX}stop typing`, {
      _id: socket.id
    })
  })

  // when the user disconnects.. perform this
  socket.on(`${SERVICE_NAME_PREFIX}disconnect`, function() {

    logger(`${socket.user['name']} 退出聊天室`)

    if (__added) {
      // --numUsers

      // echo globally that this client has left
      socket.broadcast.emit(`${SERVICE_NAME_PREFIX}user left`, {
        user: socket.user,
        numUsers: numUsers
      })
    }
  })
}

module.exports = generateSocketInstance
