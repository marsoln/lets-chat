var express = require('express'),
  app = express(),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('Users', {
  name: String,
  age: Number
});

var createUser = (name, age) => {
  var _user = new User({
    name: name,
    age: age
  });

  _user.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${_user.name} Saved...`);
    }
  });
};

// createUser('xiaoming',24);
// createUser('xiaoqiang',25);

app
  .get('/', (req, res) => {

  })
  .get('/data', (req, res) => {
    'use strict'
    res.set({
      'Content-Type': 'text/json',
      'Encoding': 'utf8'
    });

    User
      .find({
        name: req.query.name
      })
      .select('name age friends')
      // .limit(1)
      // .select({friends:1})
      .exec((err, users) => {
        console.log(users);
        if (!err) {
          res.send(users)
        } else {
          res.send('error!')
        }
      });

  })
  .listen(9000, (req, res) => {
    console.log('Server is running at port 9000.');
  });
