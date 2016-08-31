let {SUCCESS, FAIL, UNAUTHENTICATED} = require('./mobileData')
var logger = require('../../framework/logger/Logger')

var isMobileRequest = function (req) {
    return !!req.headers['os']
}

let mobileSimpleUserModel = (user) => {
    return {
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
        id: user._id,
    }
}

var mobileHandler = function (action, req, res, data) {
    logger(`mobile >>>${action}<<<`)
    switch (action) {
        case 'logout':
            res.send(SUCCESS(data))
            break
        case 'unauthenticated':
            res.send(UNAUTHENTICATED(data))
            break
        case 'loginFailed':
        case 'loginStateFailed':
            res.send(FAIL(data))
            break
        case 'loginSuccess':
        case 'loginStateSuccess':
        case 'registerSuccess':
            res.send(SUCCESS(mobileSimpleUserModel(data)))
            break
        case 'registerFailed':
            res.send(FAIL(data))
            break
    }
}

var webHandler = function (action, req, res, err) {
    switch (action) {
        case 'logout':
        case 'loginFailed':
        case 'unauthenticated':
        case 'loginStateFailed':
            if (err)
                req.session.error = err
            res.redirect('/login')
            break
        case 'registerSuccess':
        case 'loginSuccess':
        case 'loginStateSuccess':
            res.redirect('/index')
            break
        case 'registerFailed':
            if (err)
                req.session.error = err
            res.redirect('/register')
            break
    }
}

module.exports = function (action, req, res, data) {
    if (isMobileRequest(req)) {
        mobileHandler(...arguments)
    } else {
        webHandler(...arguments)
    }
}
