/**
 * 添加跨域资源共享头
 * @example app.all('*',allowCORS)
 * @param host 允许的域名
 * @returns {Function}
 */
var allowCORS = function (host) {
  return function (req, res, next) {
    res.header('Access-Control-Allow-Origin', host || '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    next()
  }
}
module.exports = allowCORS
