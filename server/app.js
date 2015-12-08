var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , jsonResHeader = (res)=> {
    res[set].call(null, {
      'Content-Type': 'text/json'
      , 'Encoding': 'utf8'
    });
  }
  ;

mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('Users', {
  name: String
  , friends: [String]
  , age: Number
});

var xiaoming = new User({
  name: 'Xiao ming',
  friends: ['Xiao qiang', 'Meng xue'],
  age: 18
});

xiaoming.save((err)=> {
  console.log(err);
});

app
  .get('/', (req, res) => {

  })
  .get('/data', (req, res) => {
    jsonResHeader(res);
  })
;