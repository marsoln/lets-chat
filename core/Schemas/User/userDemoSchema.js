/**
 * demo user schema
 */
var Schema = require('mongoose').Schema;
var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  avatar: {
    type: String,
    'default': 'https://resource-huobanyun-cn.alikunlun.com/3.1.142/content/images/avatar_default.jpg'
  },
  gender: {
    type: String,
    'enum': ['男', '女']
  },
  age: {
    type: Number,
    min: 1,
    max: 120
  },
  city: {
    type: String
  },
  hometown: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  birthday: {
    type: Date
  },
  address: {
    type: String
  },
  createdate: {
    type: Date,
    'default': Date.now()
  }
});
module.exports = UserSchema;