'use strict'

var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();
var Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/test');
var db = mongoose.createConnection('localhost', 'test'); //创建一个数据库连接

db.once('open', function () {
    //一次打开记录
    console.log('mongodb has open!');
});

//数据库监视事件
db.on('error', function (err) {
    console.log('mongodb connect error' + err);
});

//Schemas definitions
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nickName: {
        type: String
    },
    gender: {
        type: String,
        enum: ['男', '女']
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
    createDate: {
        type: Date,
        default: Date.now()
    }
});

var UserModel = db.model('User', UserSchema);

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}

app.use(bodyParser());

app.use(function (req, res, next) {
    //res.set({'Content-Type':'text/json','Encodeing':'utf8'});
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('X-Powered-By', '4.13.3');
    next();
});

//List
app.get('/api/users', function (req, res, next) {
    UserModel.find(req.query, function (err, docs) {
        if (!err) {
            res.send(docs);
        } else {
            next(err);
        }
    });
});

//Get
app.get('/api/users/:id', function (req, res, next) {
    UserModel.findById(req.params.id, function (err, doc) {
        if (!err) {
            res.send(doc);
        } else {
            next(err);
        }
    });
});

//Create
app.post('/api/users', function (req, res, next) {
    var user = new UserModel(req.body);
    user.save(function (err) {
        if (!err) {
            res.statusCode = 201;
            res.send(user);
        } else {
            next(err);
        }
    });
});

//Update
app.put('/api/users/:id', function (req, res, next) {
    var body = req.body;
    UserModel.findById(req.params.id, function (err, user) {
        for (var p in body) {
            if (body.hasOwnProperty(p)) {
                user[p] = body[p];
            }
        }
        user.save(function (err) {
            if (!err) {
                res.send(user);
            } else {
                next(err);
            }
        });
    });
});

//Delete
app.delete('/api/users/:id', function (req, res, next) {
    UserModel.findByIdAndRemove(req.params.id, function (err) {
        if (!err) {
            res.statusCode = 204;
            res.send();
        } else {
            next(err);
        }
    });
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({error: err.message});
});

app.use(function (req, res) {
    res.status(404);
    res.send({error: "Not Found"});
});

if (!module.parent) {
    app.listen(9000, function () {
        console.log('Server started on port 9000');
    });
}

