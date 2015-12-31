var mongoose = require('mongoose');
var propReader = require('properties-reader')('server.properties');

module.exports = {
  /**
   * 打开数据库连接
   * @returns {Connection} 数据库连接对象
   */
  openConnection: function () {
    var db = mongoose.createConnection(propReader.get('dbServer.ip'), propReader.get('dbServer.name'));

    //成功链接数据库
    db.once('open', function () {
      console.log('mongodb has open!');
    });

    //链接数据库失败
    db.on('error', function (err) {
      console.log('mongodb connect error' + err);
    });

    return db;
  }
};
