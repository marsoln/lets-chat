'use strict'
var router = require('express').Router()
var securityPass = require('../../framework/security/pass')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var getUserModel = require('../../core/models/demoUser')
var UserModel = getUserModel()
var __authenticate = (name, pass, fn) => {
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
			return fn(new Error('该用户尚未注册.'))
		}
	})
}

router.get('/', (req, res) => {
    let msg = req.session.error
    req.session.error = ''
	res.render('login', {
		title: 'welcome to quarrel site.',
		error: msg
	})
})

router.post('/', urlencodedParser, (req, res) => {
	'use strict'
	if (req.body.username.trim() !== '' && req.body.password.trim() !== '') {
		__authenticate(req.body.username, req.body.password, function (err, user) {
			var sess = req.session
			if (!err && user) {
				sess.regenerate(() => {
					req.session.user = user
					res.redirect('/index')
				})
			} else {
				sess.error = err.message
				res.redirect('/login')
			}
		})
	} else {
		sess.error = '用户名密码不能为空'
		res.redirect('/login')
	}
})

module.exports = router
