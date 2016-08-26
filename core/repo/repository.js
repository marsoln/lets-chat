var connection = require('../../framework/dbProviders/mongoProvider').connection

function getConnection(key, model) {
    return connection.model(key, model)
}

module.exports = getConnection
