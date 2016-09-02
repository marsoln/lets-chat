let {
    SUCCESS,
    FAIL,
    UNAUTHENTICATED
} = require('./mobileData')
const IS_FROM_MOBILE = function (req) {
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

let mobileHandler = function (action, req, res, data) {
    switch (action) {
        case 'logout':
            res.send(SUCCESS(data))
            break
        case 'unauthenticatedGraphql':
            res.send(UNAUTHENTICATED(data))
            break
        case 'unauthenticated':
        case 'unauthenticatedAjax':
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

let webHandler = function (action, req, res, err) {
    switch (action) {
        case 'logout':
        case 'loginFailed':
        case 'loginStateFailed':
            if (err)
                req.session.error = err
            res.redirect('/login')
            break
        case 'unauthenticatedGraphql':
            res.send(UNAUTHENTICATED(err))
            break
        case 'unauthenticatedAjax':
            res.send(err)
            break
        case 'unauthenticated':
            res.redirect(`/login?redirect=${encodeURIComponent(req.url)}`)  // 重定向到登录页
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
    if (IS_FROM_MOBILE(req)) {
        mobileHandler(...arguments)
    } else {
        webHandler(...arguments)
    }
}
