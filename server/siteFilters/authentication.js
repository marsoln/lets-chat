/**
 * 基本用户身份验证模块
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next)=> {
  if (req.session.user) {
    next();
  } else {
    console.log(`access denied for ${req.session.id}.`);
    res.redirect('/login');
  }
};