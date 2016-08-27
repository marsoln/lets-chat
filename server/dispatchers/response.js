let {SUCCESS, FAIL, UNAUTHENTICATED} = require('./mobileData')

var isMobileRequest = function (req) {
    return !!req.headers['os']
}

var mobileHandler = function (action, req, res, data) {
    switch (action) {
        case 'logout':
            res.send(SUCCESS(data))
            break
        case 'unauthenticated':
            res.send(UNAUTHENTICATED(data))
            break
        case 'loginFailed':
            res.send(FAIL(data))
            break
        case 'loginSuccess':
            res.send(SUCCESS(data))
            break
    }
}

var webHandler = function (action, req, res, err) {
    switch (action) {
        case 'logout':
        case 'loginFailed':
        case 'unauthenticated':
            if (err)
                req.session.error = err
            res.redirect('/login')
            break
        case 'loginSuccess':
            res.redirect('/index')
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
