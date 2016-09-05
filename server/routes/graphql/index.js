let schema = require('./schema/default')
let graphqlRoutes = require('express-graphql')(req => ({
    schema: schema,
    context: req.session,
    graphiql: true
}))

module.exports = graphqlRoutes
