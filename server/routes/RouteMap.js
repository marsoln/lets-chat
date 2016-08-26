var router = require('express').Router()
var userRoutes = require('./user')
var indexRoutes = require('./index')
var loginRoutes = require('./login')
var registerRoutes = require('./register')
var schema = require('../schema/default')
var authInseption = require('../siteFilters/authentication').authInseption
var graphqlRoutes = require('express-graphql')(req => ({
    schema: schema,
    context: req.session,
    graphiql: true
}))

exports.init = function (app) {
    // --routes--
    app.use('/login', loginRoutes)
    app.use('/register', registerRoutes)

    // --authentication valid routers--
    app.use('/', authInseption(indexRoutes))
    app.use('/users', authInseption(userRoutes))
    app.use('/graphql', authInseption(graphqlRoutes))

    // --error handler--
    app.get('*', require('../siteFilters/notFound'))
    app.use(require('../siteFilters/serverError'))
}