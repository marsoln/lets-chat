/**
 * demo user schema
 */
var schema = require('../schemas/user')
var createModel = require('../repo/repository')

module.exports = function () {
  return createModel('User', schema)
}
