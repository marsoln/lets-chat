var router = require('express').Router()
var fs = require('fs')

router.get(['/', '/index'], (req, res) => {
	res.render('index', {
		title: '来啊,互相伤害啊!',
		username: req.session.user.username,
		avatar: req.session.user.avatar,
		mainFile: JSON.parse(fs.readFileSync('./server/hashBundleInfo.json')).assetsByChunkName.main
	})
})

module.exports = router
