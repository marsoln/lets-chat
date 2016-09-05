let router = require('express').Router()
let logger = require('../../../framework/logger/Logger')
let resDispatcher = require('../../dispatchers/response')

router.get('/', (req, res) => {
    let user = req.session.user
    if (user) {
        req.session.user = null
        logger(`用户 ${user.username} 已登出`)
    }
    resDispatcher('logout', req, res, '登出成功')
})

module.exports = router
