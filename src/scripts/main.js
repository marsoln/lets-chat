export default () => {
  angular
    .module('chatApp', [])
    .controller('chatCtrl', ['$scope', '$timeout', function (scope, $timeout) {
      const TYPING_TIMER_LENGTH = 600
      var socket = io()
      var connected = false
      var typing = false
      var lastTypingTime
      var $inputMessage = $('input[data-ng-model="viewData.sendContent"]')
      var updateTyping = function () {
        if (connected) {
          if (!typing) {
            typing = true
            socket.emit('typing')
          }
          lastTypingTime = (new Date()).getTime()

          setTimeout(function () {
            var typingTimer = (new Date()).getTime()
            var timeDiff = typingTimer - lastTypingTime
            if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
              socket.emit('stop typing')
              typing = false
            }
          }, TYPING_TIMER_LENGTH)
        }
      }

      scope.keydownHandler = function (event) {
        event.ctrlKey || event.metaKey || event.altKey || $inputMessage.focus()
        if (event.which === 13) {
          scope.sendMessage()
        }
      }

      $inputMessage.on('input', function () {
        updateTyping()
      })

      socket.on('login', function (data) {
        connected = true
        scope.notify({
          content: '欢迎来到聊天室',
          icon: 'fa-smile-o'
        })
        scope.viewData.numUsers = data['numUsers']
        scope.$digest()
      })
      socket.on('new message', function (message) {
        scope.viewData.chatQueue.push(message)
        $timeout(function () {
          $('.direct-chat-messages').scrollTop(99999)
        }, 1)
        scope.$digest()
      })
      socket.on('user joined', function (data) {
        scope.notify({
          content: data.user.name + '来打酱油了...',
          icon: 'fa-user-plus'
        })
        scope.viewData.numUsers = data['numUsers']
        scope.$digest()
      })
      socket.on('user left', function (data) {
        scope.notify({
          content: data.user.name + '妈妈喊他回家吃饭了...',
          icon: 'fa-hand-peace-o'
        })
        scope.viewData.numUsers = data['numUsers']
        scope.$digest()
      })
      socket.on('typing', function (data) {
        scope.addChatTyping(data)
        scope.$digest()
      })
      socket.on('stop typing', function (data) {
        scope.removeChatTyping(data)
        scope.$digest()
      })

      scope.chatroom = {
        name: '食堂开门了,冲!'
      }

      scope.currentUser = __currentUser

      scope.viewData = {
        messages: [],
        notifications: [],
        chatQueue: [],
        logInfo: [],
        contactQueue: [],
        sendContent: '',
        numUsers: 1
      }

      scope.log = function (data) {
        scope.viewData.logInfo.unshift(data)
      }

      scope.removeLog = function (id) {
        var _index = 0
        while (_index < scope.viewData.logInfo.length) {
          if (scope.viewData.logInfo[_index]['_id'] === id) {
            break
          }
          _index++
        }
        if (_index > -1) {
          scope.viewData.logInfo.splice(_index, 1)
        }
      }

      scope.notify = function (notification) {
        scope.viewData.notifications.unshift(notification)
      }

      /**
       * 发送消息
       */
      scope.sendMessage = function () {
        socket.emit('stop typing')
        typing = false
        if (scope.viewData.sendContent != '') {
          var message = {
            message: scope.viewData.sendContent
          }
          socket.emit('new message', message)
          message.isMine = true
          message.sender = scope.currentUser
          message.createTime = new Date()
          scope.viewData.chatQueue.push(message)
          scope.viewData.sendContent = ''
          // $inputMessage.blur()
          $timeout(function () {
            $('.direct-chat-messages').scrollTop(99999)
          }, 1)
        } else {
          $.warning('发送内容不能为空!')
        }
      }

      scope.addChatTyping = function (data) {
        scope.log({
          _id: data['_id'],
          content: data['user']['name'] + '正在输入...'
        })
      }

      scope.removeChatTyping = function (data) {
        scope.removeLog(data['_id'])
      }

      socket.emit('add user', scope.currentUser)
    }])

}
