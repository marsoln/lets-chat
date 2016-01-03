var router = require('express').Router();
var authentication = require('../siteFilters/authentication');
var contentTypes = require('../siteFilters/contentTypes');

/**
 * 登录身份认证
 */
router.use(authentication);

router.get(['/', '/index'], (req, res)=> {
  res.render('index', {
    title: '来,撕!',
    username: req.session.user.username,
    avatar: req.session.user.avatar
  });
});

module.exports = router;