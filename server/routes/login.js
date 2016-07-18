var router = require('express').Router()
// var contentTypes = require('../siteFilters/contentTypes')
var securityPass = require('../../framework/security/pass')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var UserModel = require('../../core/model/demoUser')
var __authenticate = (name, pass, fn) => {
  'use strict'
  console.log(`验证用户${name}身份..`)
  UserModel.findOne({
    username: name
  }, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (user) {
      securityPass.hash(pass, user.salt, (err, hash) => {
        if (err) {
          return fn(err)
        }
        if (hash.toString() === user.hash) {
          return fn(null, user)
        } else {
          return fn(new Error('密码错误.'))
        }
      })
    } else {
      // 用户尚未注册 使用用户名作为盐加密密码
      securityPass.hash(pass, (err, salt, hash) => {
        if (err) {
          // 加密密码失败
          console.log(err)
          fn(err, null)
        } else {
          // 加密成功 存储用户数据
          var user = {
            username: name,
            salt: salt,
            hash: hash,
            avatar: 'images/avatar_default.jpg'
          }
          var userModel = UserModel(user)
          userModel.save((err, newUser) => {
            if (!err) {
              fn(null, newUser)
            } else {
              console.error(`存储用户数据失败,Err:${err}`)
              throw (new Error('用户认证失败.'))
            }
          })
        }
      })
    }
  })
}

router.get('/', (req, res) => {
  res.render('login', {
    title: 'welcome to quarrel site.',
    error: req.session.error
  })
})

router.post('/', urlencodedParser, (req, res) => {
  'use strict'
  if (req.body.username.trim() !== '' && req.body.password.trim() !== '') {
    __authenticate(req.body.username, req.body.password, function (err, user) {
      if (err) {
        console.log(err)
      }
      var sess = req.session
      if (user) {
        sess.regenerate(() => {
          req.session.user = user
          res.redirect('/index')
        })
      } else {
        sess.error = '用户名或密码错误'
        res.redirect('/login')
      }
    })
  } else {
    sess.error = '用户名密码不能为空'
    res.redirect('/login')
  }
})

module.exports = router
