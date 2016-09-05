/**
 * 404 not found 的错误处理
 * @returns {Function}
 */

let logger = require('../../framework/logger/Logger')

module.exports = (req, res, next) => {
  logger('404,not found!')
  res.status(404)
  res.send({
    error: 'Not Found'
  })
}
