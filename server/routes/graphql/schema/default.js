var _graphql = require('graphql')
var getUserModel = require('../../../../core/models/demoUser')
var UserModel = getUserModel()
var GraphQLSchema = _graphql.GraphQLSchema
var GraphQLObjectType = _graphql.GraphQLObjectType
var GraphQLString = _graphql.GraphQLString
var GraphQLList = _graphql.GraphQLList
var GraphQLInt = _graphql.GraphQLInt
var GraphQLNonNull = _graphql.GraphQLNonNull

// todo 权限限制

const UserType = new GraphQLObjectType({
    name: 'user',
    description: 'user model',
    fields: {
        id: {
            type: GraphQLString,
            resolve: o => o['_id']
        },
        nickname: {
            type: GraphQLString,
            resolve: o => o.nickname
        },
        username: {
            type: GraphQLString,
            resolve: o => o.username
        },
        age: {
            type: GraphQLString,
            resolve: o => o.age
        },
        avatar: {
            type: GraphQLString,
            resolve: o => o.avatar
        },
        birthday: {
            type: GraphQLString,
            resolve: o => o.birthday
        },
        address: {
            type: GraphQLString,
            resolve: o => o.address
        },
        hometown: {
            type: GraphQLString,
            resolve: o => o.hometown
        },
        city: {
            type: GraphQLString,
            resolve: o => o.city
        },
        phone: {
            type: GraphQLString,
            resolve: o => o.phone
        },
        email: {
            type: GraphQLString,
            resolve: o => o.email
        },
        gender: {
            type: GraphQLInt,
            resolve: o => o.gender
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
