'use strict';
let numUsers = 0;

module.exports = function (socket) {
  var __added = false;
  socket.on('new message', function (data) {
    var msgData = {
      sender: socket.user,
      createTime: new Date(),
      message: data.message
    };
    socket.broadcast.emit('new message', msgData);
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (userInfo) {
    if (__added) return;

    // we store the username in the socket session for this client
    socket.user = userInfo;
    ++numUsers;
    __added = true;

    socket.emit('login', {
      numUsers: numUsers
    });

    console.log(`user ${userInfo.name} has loggin`);

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      user: socket.user,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      user: socket.user,
      _id: socket.id
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      _id: socket.id
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (__added) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        user: socket.user,
        numUsers: numUsers
      });
    }
  });
};
