var _graphql = require('graphql')
var UserModel = require('../../../../core/models').user()
var GraphQLSchema = _graphql.GraphQLSchema
var GraphQLObjectType = _graphql.GraphQLObjectType
var GraphQLString = _graphql.GraphQLString
var GraphQLList = _graphql.GraphQLList
var GraphQLInt = _graphql.GraphQLInt
var GraphQLNonNull = _graphql.GraphQLNonNull
var GraphQLBoolean = _graphql.GraphQLBoolean

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
            type: GraphQLString,
            resolve: o => o.gender
        }
    }
})

/**
 * 其实这个挺操蛋的 
 * 因为json本来就是k-v形式的数据体 
 * 完全可以接受一个string然后JSON.parse 之后作为update的参数
 * 那么问题来了为什么还要建一个k-v-pair的type呢
 * 为了练练手啊 
 * 仅此而已!!!
 * */
const KVPair = new GraphQLObjectType({
    name: 'KeyValuePair',
    description: '键值对啊',
    fields: {
        key: {
            type: GraphQLString,
            require: true,
        },
        value: {
            type: GraphQLString,
            require: true,
        }
    }
})

const UserListType = new GraphQLList(UserType)
const UpdateCollection = new GraphQLList(KVPair)

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'UsersQuery',
        description: '查询用户信息',
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
                        require: true,
                    },
                },
                resolve(root, params, session) {
                    return UserModel.findOne({
                        _id: params.id
                    })
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'UsersMutation',
        description: '修改用户信息',
        fields: {
            updateUserProfile: {
                type: GraphQLBoolean,
                description: '修改指定用户的个人资料',
                args: {
                    id: {
                        type: GraphQLString,
                        require: true,
                    },
                    terms: {
                        type: GraphQLString,
                        require: true
                    }
                },
                resolve(root, params, session) {
                    let tempModel = JSON.parse(params.terms)
                    return UserModel
                        .findOneAndUpdate({
                            _id: params.id
                        }, tempModel)
                        .then((_d) => { return !!_d })
                }
            }
        }
    })
})

module.exports = schema
