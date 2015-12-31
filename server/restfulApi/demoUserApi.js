var db = require('../../framework/dbProviders/mongoProvider').openConnection(),
  UserSchema = require('../../core/Schemas/userDemoSchema'),
  UserModel = db.model('User', UserSchema)
  ;

var exportsApi = function (app) {
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
    UserModel.findById(req.params.id, function (err, user) {
      if (!err) {
        res.send(user);
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
      if (!err) {
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
      } else {
        console.error(err);
        next();
      }
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

};

module.exports = exportsApi;