/**
 * 404 not found 的错误处理
 * @returns {Function}
 */

var logger = require('../logger/Logger')
module.exports = function (err, req, res, next) {
  logger(err)
  res.status(404)
  res.send({
    error: 'Not Found'
  })
}
