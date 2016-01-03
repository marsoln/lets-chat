angular
  .module('chatApp', [])
  .factory('nameGenerator', function () {
    var _names = [
      "伯毅",
      "节都",
      "另林",
      "逐天",
      "逐日",
      "昊祯",
      "昊天",
      "龙恩",
      "炎恩",
      "鸿恩",
      "希文",
      "希诚",
      "玄华",
      "玄晋",
      "元贞",
      "伸义",
      "巴莫",
      "子烨",
      "子龙",
      "子赫",
      "圣卿",
      "尚儒",
      "水哲",
      "祺祾",
      "祾祯",
      "焜煊",
      "施祁",
      "善琦",
      "垚丞",
      "兴尧",
      "可尧",
      "炫琰",
      "家宇",
      "子骞",
      "峻熙",
      "嘉懿",
      "煜城",
      "懿轩",
      "烨华",
      "煜祺",
      "智宸",
      "正豪",
      "昊然",
      "志泽",
      "明杰",
      "弘文",
      "烨伟",
      "苑博",
      "鹏涛",
      "炎彬",
      "鹤轩",
      "伟泽",
      "君昊",
      "熠彤",
      "鸿煊",
      "博涛",
      "苑杰",
      "黎昕",
      "烨霖",
      "哲瀚",
      "雨泽",
      "楷瑞",
      "建辉",
      "致远",
      "俊驰",
      "雨泽",
      "烨磊",
      "国豪",
      "伟奇",
      "文博",
      "天佑",
      "文昊",
      "修杰",
      "黎昕",
      "远航",
      "旭尧",
      "英杰",
      "圣杰",
      "俊楠",
      "鸿涛",
      "伟祺",
      "荣轩",
      "浩宇",
      "晋鹏",
      "静香",
      "梦洁",
      "凌薇",
      "美莲",
      "雅静",
      "雪丽",
      "依娜",
      "雅芙",
      "雨婷",
      "晟涵",
      "梦舒",
      "秀影",
      "海琼",
      "雪娴",
      "梦梵",
      "笑薇",
      "瑾梅",
      "晟楠",
      "歆婷",
      "思颖",
      "欣然",
      "可岚",
      "天瑜",
      "婧琪",
      "媛馨",
      "玥婷",
      "滢心",
      "雪馨",
      "姝瑗",
      "颖娟",
      "歆瑶",
      "凌菲",
      "钰琪",
      "婧宸",
      "靖瑶",
      "瑾萱",
      "佑怡",
      "婳祎",
      "檀雅",
      "若翾",
      "熙雯",
      "语嫣",
      "妍洋",
      "滢玮",
      "沐卉",
      "琪涵",
      "佳琦",
      "伶韵",
      "思睿",
      "清菡",
      "欣溶",
      "菲絮",
      "诗涵",
      "璇滢",
      "静馨",
      "妙菱",
      "心琪",
      "雅媛",
      "晨芙",
      "婧诗",
      "露雪",
      "蕊琪",
      "舒雅"
    ];
    return function () {
      return _names[Math.floor(Math.random() * _names.length)];
    }
  })
  .controller('chatCtrl', ['$scope', 'nameGenerator', '$timeout', function (scope, nameGenerator, $timeout) {
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


    scope.keydownHandler = function (event) {
      if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $inputMessage.focus();
      }
      if (event.which === 13) {
        scope.sendMessage();
      }
    };

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
      scope.viewData.chatQueue.push(message);
      $timeout(function () {
        $('.direct-chat-messages').scrollTop(99999);
      }, 1);
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

    scope.chatroom = {
      name: '食堂开门了,冲!'
    };

    scope.currentUser = __currentUser;

    scope.viewData = {
      messages: [],
      notifications: [],
      chatQueue: [],
      logInfo: [],
      contactQueue: [],
      sendContent: '',
      numUsers: 1
    };

    scope.log = function (data) {
      scope.viewData.logInfo.unshift(data);
    };

    scope.removeLog = function (id) {
      var _index = 0;
      while (_index < scope.viewData.logInfo.length) {
        if (scope.viewData.logInfo[_index]['_id'] === id) {
          break;
        }
        _index++;
      }
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
        scope.viewData.chatQueue.push(message);
        scope.viewData.sendContent = '';
        $inputMessage.blur();
        $timeout(function () {
          $('.direct-chat-messages').scrollTop(99999);
        }, 1);
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