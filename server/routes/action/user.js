let UserModel = require('../../../core/models').user()
let router = require('express').Router()

// List
router.get('/', function (req, res, next) {
  UserModel.find(req.query, function (err, docs) {
    if (!err) {
      res.send(docs)
    } else {
      next(err)
    }
  })
})

// Get
router.get('/:id', function (req, res, next) {
  UserModel.findById(req.params.id, function (err, user) {
    if (!err) {
      res.send(user)
    } else {
      next(err)
    }
  })
})

// Create
router.post('/', function (req, res, next) {
  let user = new UserModel(req.body)
  user.save(function (err) {
    if (!err) {
      res.statusCode = 201
      res.send(user)
    } else {
      next(err)
    }
  })
})

// Update
router.put('/:id', function (req, res, next) {
  let body = req.body
  UserModel.findById(req.params.id, function (err, user) {
    if (!err) {
      for (let p in body) {
        if (body.hasOwnProperty(p)) {
          user[p] = body[p]
        }
      }
      user.save(function (err) {
        if (!err) {
          res.send(user)
        } else {
          next(err)
        }
      })
    } else {
      console.error(err)
      next()
    }
  })
})

// Delete
router.delete('/:id', function (req, res, next) {
  UserModel.findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      res.statusCode = 204
      res.send()
    } else {
      next(err)
    }
  })
})

module.exports = router
