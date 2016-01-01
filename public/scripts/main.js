angular
  .module('chatApp', [])
  .controller('chatCtrl', ['$scope', function (scope) {
    const TYPING_TIMER_LENGTH = 600;
    var socket = io();
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $inputMessage = $('input[data-ng-model="viewData.sendContent"]');
    var updateTyping = function () {
      if (connected) {
        if (!typing) {
          typing = true;
          socket.emit('typing');
        }
        lastTypingTime = (new Date()).getTime();

        setTimeout(function () {
          var typingTimer = (new Date()).getTime();
          var timeDiff = typingTimer - lastTypingTime;
          if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
            socket.emit('stop typing');
            typing = false;
          }
        }, TYPING_TIMER_LENGTH);
      }
    };
    $(window).keydown(function (event) {
      if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $inputMessage.focus();
      }
      if (event.which === 13) {
        scope.sendMessage();
        scope.$digest();
      }
    });
    $inputMessage.on('input', function () {
      updateTyping();
    });

    socket.on('login', function (data) {
      connected = true;
      scope.notify({
        content: '欢迎来到聊天室',
        icon: 'fa-smile-o'
      });
      scope.viewData.numUsers = data['numUsers'];
      scope.$digest();
    });
    socket.on('new message', function (message) {
      scope.viewData.chatQueue.unshift(message);
      scope.$digest();
    });
    socket.on('user joined', function (data) {
      scope.notify({
        content: data.user.name + '来打酱油了...',
        icon: 'fa-user-plus'
      });
      scope.viewData.numUsers = data['numUsers'];
      scope.$digest();
    });
    socket.on('user left', function (data) {
      scope.notify({
        content: data.user.name + '妈妈喊他回家吃饭了...',
        icon: 'fa-hand-peace-o'
      });
      scope.viewData.numUsers = data['numUsers'];
      scope.$digest();
    });
    socket.on('typing', function (data) {
      scope.addChatTyping(data);
      scope.$digest();
    });
    socket.on('stop typing', function (data) {
      scope.removeChatTyping(data);
      scope.$digest();
    });


    scope.currentUser = {
      name: 'ShitEater'
      , avatar: '/images/avatar_default.jpg'
    };

    scope.viewData = {
      messages: [],
      notifications: [],
      chatQueue: [],
      logInfo: [],
      sendContent: '',
      numUsers: 1
    };

    scope.log = function (data) {
      scope.viewData.logInfo.unshift(data);
    };

    scope.removeLog = function (id) {
      var _index = scope.viewData.logInfo.findIndex(function (log) {
        return log['_id'] == id;
      });
      if (_index > -1) {
        scope.viewData.logInfo.splice(_index, 1);
      }
    };

    scope.notify = function (notification) {
      scope.viewData.notifications.unshift(notification);
    };

    /**
     * 发送消息
     */
    scope.sendMessage = function () {
      socket.emit('stop typing');
      typing = false;
      if (scope.viewData.sendContent != '') {
        var message = {
          message: scope.viewData.sendContent
        };
        socket.emit('new message', message);
        message.isMine = true;
        message.sender = scope.currentUser;
        message.createTime = new Date();
        scope.viewData.chatQueue.unshift(message);
        scope.viewData.sendContent = '';
      } else {
        $.warning('发送内容不能为空!');
      }
    };

    scope.addChatTyping = function (data) {
      scope.log({
        _id: data['_id'],
        content: data['user']['name'] + '正在输入...'
      });
    };

    scope.removeChatTyping = function (data) {
      scope.removeLog(data['_id']);
    };

    socket.emit('add user', scope.currentUser);
  }]);