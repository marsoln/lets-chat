let resDispatcher = require('../dispatchers/response')

/**
 * 基本用户身份验证模块
 * @param req
 * @param res
 */
module.exports = (req, res, next) => {
  if (req.session.user) {
    next()
  } else if (req.headers['x-requested-with'] && req.headers['x-requested-with'].toLowerCase() == 'xmlhttprequest' ||
    /(json)+/g.test(req.headers['accept'])) { // 判断是否异步请求 带有x-request-with为xmlhttprequest的请求头或者accept含有json
    if (/^\/graphql/.test(req.url)) {
      resDispatcher('unauthenticatedGraphql', req, res, 'graphql查询需要一个合法的身份.')
    } else {
      resDispatcher('unauthenticatedAjax', req, res, null)
    }
  } else {
    if (req.url === '/register') {  // 注册可以匿名访问
      next()
    } else {
      resDispatcher(`unauthenticated`, req, res, null)
    }
  }
}
