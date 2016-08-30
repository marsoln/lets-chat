var router = require('express').Router()
var securityPass = require('../../../framework/security/pass')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var logger = require('../../logger/Logger')
var UserModel = require('../../../core/models').user()
var resDispatcher = require('../../dispatchers/response')

var __authenticate = (name, pass, fn) => {
	logger(`验证用户${name}身份..`)
	UserModel.findOne({
		username: name
	}, (err, user) => {
		if (err) {
			logger(err)
		}
		if (user) {
			securityPass.hash(pass, user.salt, (err, hash) => {
				if (err) {
					return fn(err)
				}
				if (hash.toString() === user.hash) {
					return fn(null, user)
				} else {
					logger(`用户 ${name} 使用错误密码登录.`)
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
		title: 'Welcome ^-^',
		error: msg
	})
})

router.post('/', urlencodedParser, (req, res) => {
	'use strict'
	if (req.body.username.trim() !== '' && req.body.password.trim() !== '') {
		__authenticate(req.body.username, req.body.password, function (err, user) {
			var sess = req.session
			if (!err && user) {
				logger(`用户 ${user.username} 已登录`)
				sess.regenerate(() => {
					req.session.user = user
					resDispatcher('loginSuccess', req, res, {
						username: user.username,
						avatar: user.avatar,
						id: user._id,
					})
				})
			} else {
				resDispatcher('loginFailed', req, res, err.message)
			}
		})
	} else {
		resDispatcher('loginFailed', req, res, '用户名密码不能为空')
	}
})

// check user login status
router.get('/state', (req, res) => {
	let _currUser = req.session.user
	if (_currUser) {
		resDispatcher('loginStateSuccess', req, res, {
			id: _currUser._id,
			username: _currUser.username,
			avatar: _currUser.avatar
		})
	} else {
		resDispatcher('loginStateFailed', req, res, null)
	}
})

module.exports = router
