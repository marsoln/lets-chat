var schema = require('./schema/default')
var graphqlRoutes = require('express-graphql')(req => ({
    schema: schema,
    context: req.session,
    graphiql: true
}))

module.exports = graphqlRoutes