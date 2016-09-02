let authValidation = require('../siteFilters/authentication')
let logger = require('../../framework/logger/Logger')

// --- actions ---
let userRoutes = require('./action/user')
let indexRoutes = require('./action/index')
let loginRoutes = require('./action/login')
let logoutRoutes = require('./action/logout')
let registerRoutes = require('./action/register')

// --- graphql service ---
let graphqlRoutes = require('./graphql/index')

exports.init = function (app) {
    // -- 服务器请求日志 --
    app.use('/', (req, res, next) => {
        logger(req.url)
        logger(JSON.stringify(req.body))
        next()
    })

    // --routes--
    app.use('/login', loginRoutes)
    app.use('/logout', logoutRoutes)
    app.use('/register', registerRoutes)

    // --authentication valid routers--
    app.use('/', authValidation)
    app.use('/', indexRoutes)
    app.use('/users', userRoutes)
    app.use('/graphql', graphqlRoutes)

    // --error handler--
    app.use(require('../errors/notFound'))
    app.use(require('../errors/serverError'))

}
