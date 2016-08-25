var _graphql = require('graphql')
var getUserModel = require('../../core/models/demoUser')
var UserModel = getUserModel()
var graphql = _graphql.graphql,
    GraphQLSchema = _graphql.GraphQLSchema,
    GraphQLObjectType = _graphql.GraphQLObjectType,
    GraphQLString = _graphql.GraphQLString,
    GraphQLList = _graphql.GraphQLList

// todo 权限限制

const UserType = new GraphQLObjectType({
    name: 'user',
    description: 'user model',
    fields: {
        nickname: {
            type: GraphQLString,
            resolve: o => o.username
        },
        id: {
            type: GraphQLString,
            resolve: o => o['_id']
        }
    }
})

const UserListType = new GraphQLList(UserType)

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'UsersQuery',
        description: 'query users info',
        fields: {
            userList: {
                type: UserListType,
                description: 'all users',
                resolve(root, param, session) {
                    return UserModel.find()
                }
            },
            user: {
                type: UserType,
                description: 'query single user info',
                args: {
                    id: {
                        type: GraphQLString,
                        require: true
                    }
                },
                resolve(root, param, session) {
                    return UserModel.findOne({
                        _id: param.id
                    })
                }
            }
        }
    })
})

module.exports = schema