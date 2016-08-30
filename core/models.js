const CREATE_MODEL = require('./repo/repository')
const SCHEMAS = ['user','chatRecord']
let schemaMapper = {}
/**
 * 根据SCHEMAS中的key生成对应的schema映射
 * 映射生成的是获取对应model的connection创建方法
 * 这样只会在调用时去构建数据库连接
 */
SCHEMAS.forEach(function (key) {
  schemaMapper[key] = () => CREATE_MODEL(key, require(`./schemas/${key}`))
}, this)

module.exports = schemaMapper