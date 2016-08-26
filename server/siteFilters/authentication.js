const GRAPHQL_ERR_MSG = { err: 'graphql query need a valid authentication' }
/**
 * 基本用户身份验证模块
 * @param req
 * @param res
 */
const authentication = (req, res) => {
  if (req.session.user) {
    return true
  } else if (req.headers['x-requested-with'] && req.headers['x-requested-with'].toLowerCase() == 'xmlhttprequest'
    || /(json)+/g.test(req.headers['accept'])) { // 判断是否异步请求 带有x-request-with为xmlhttprequest的请求头或者accept含有json
    if (/^\/graphql/.test(req.url)) {  // graphql 的请求返回个
      res.send(GRAPHQL_ERR_MSG)
      return false
    } else {
      res.send(null)
      return false
    }
  } else {
    if (req.url === '/register') {  // 注册可以匿名访问 
      return true
    } else {
      res.redirect(`/login?redirect=${encodeURIComponent(req.url)}`)  // 重定向到登录页
      return false
    }
  }
}

const authInseption = (nextFunc) => {
  return (req, res, next) => {
    authentication(req, res) && nextFunc(req, res, next)
  }
}

exports.authInseption = authInseption
exports.authentication = authentication