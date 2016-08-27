var authInseption = require('../siteFilters/authentication').authInseption

// --- actions ---
var userRoutes = require('./action/user')
var indexRoutes = require('./action/index')
var loginRoutes = require('./action/login')
var logoutRoutes = require('./action/logout')
var registerRoutes = require('./action/register')

// --- graphql service ---
var graphqlRoutes = require('./graphql/index')

exports.init = function (app) {
    // --debug--
    // app.use('/', (req, res, next) => {
    //     console.log(req.url)
    //     next()
    // })

    // --routes--
    app.use('/login', loginRoutes)
    app.use('/logout', logoutRoutes)
    app.use('/register', registerRoutes)

    // --authentication valid routers--
    app.use('/', authInseption(indexRoutes))
    app.use('/users', userRoutes)
    app.use('/graphql', graphqlRoutes)

    // --error handler--
    app.get('/', require('../errors/notFound'))
    app.use(require('../errors/serverError'))
}
