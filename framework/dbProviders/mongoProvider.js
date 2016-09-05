let mongoose = require('mongoose')
let propReader = require('properties-reader')('server.properties')
let db = mongoose.createConnection(propReader.get('dbServer.ip'), propReader.get('dbServer.name'))

mongoose.Promise = global.Promise

// 成功链接数据库
db.once('open', function () {
  console.log('mongodb has open!')
})

// 链接数据库失败
db.on('error', function (err) {
  console.log('mongodb connect error' + err)
})

exports.connection = db
