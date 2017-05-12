let router = require('express').Router()
let mainFilePath = require('../../bundleInfo.json').main

router.get(['/', '/index'], (req, res) => {
	res.render('index', {
		title: '来啊,互相伤害啊!',
		username: req.session.user.username,
		avatar: req.session.user.avatar,
		mainFile: mainFilePath	// fs 的当前路径是server运行时的路径
	})
})

module.exports = router
