/**
 * 404 not found 的错误处理
 * @returns {Function}
 */
module.exports = function (err, req, res, next) {
  console.log(err)
  res.status(404)
  res.send({
    error: 'Not Found'
  })
}
