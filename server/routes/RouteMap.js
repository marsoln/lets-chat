var router = require('express').Router()
var authInseption = require('../siteFilters/authentication').authInseption

// --- web actions ---
var userRoutes = require('./web/user')
var indexRoutes = require('./web/index')
var loginRoutes = require('./web/login')
var registerRoutes = require('./web/register')

// --- graphql service ---
var graphqlRoutes = require('./graphql/index')

// --- mobile actions ---


exports.init = function (app) {
    // --routes--
    app.use('/login', loginRoutes)
    app.use('/register', registerRoutes)

    // --authentication valid routers--
    app.use('/', authInseption(indexRoutes))
    app.use('/users', authInseption(userRoutes))
    app.use('/graphql', authInseption(graphqlRoutes))
    

    // --error handler--
    app.get('*', require('../errors/notFound'))
    app.use(require('../errors/serverError'))
}