'use strict'
var router = require('express').Router()
var securityPass = require('../../framework/security/pass')
var UserModel = require('../../core/model/demoUser')

router.get('/', (req, res) => {
    let msg = req.session.error
    req.session.error = ''
    res.render('register', {
        title: '来啊,注册啊',
        error: msg
    })
})

router.post('/', (req, res) => {
    let name = req.body.username
    let pass = req.body.password
    let confirm_password = req.body.confirmpwd
    let sess = req.session
    let handler = (err, user) => {
        if (!err && user) {
            sess.regenerate(() => {
                req.session.user = user
                res.redirect('/index')
            })
        } else {
            sess.error = err.message
            res.redirect(`/register`)
        }
    }

    if (pass !== confirm_password) {
        handler(new Error('两次密码输入不一致!'))
    } else if (name === '' || pass === '') {
        handler(new Error('用户名/密码不能为空!'))
    } else {
        // 校验用户是否已注册
        UserModel.findOne({
            username: name
        }, (err, user) => {
            if (err) {
                handler(err)
            }
            if (user) {
                handler(new Error('用户名已存在.'))
            } else {
                // 用户尚未注册 使用用户名作为盐加密密码
                securityPass.hash(pass, (err, salt, hash) => {
                    if (err) {
                        // 加密密码失败
                        handler(err)
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
                                handler(null, newUser)
                            } else {
                                handler(new Error('用户创建失败.'))
                            }
                        })
                    }
                })
            }
        })
    }
})

module.exports = router
