/**
 * 500 服务器错误的处理
 * @returns {Function}
 */
module.exports = function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    error: err.message
  });
};