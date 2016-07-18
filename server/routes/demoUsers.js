var UserModel = require('../../core/model/demoUser')
var router = require('express').Router()
var authentication = require('../siteFilters/authentication')
// var contentTypes = require('../siteFilters/contentTypes')

// router.use(contentTypes.json)
/**
 * 身份验证
 */
router.use(authentication)

// List
router.get('/', function (req, res, next) {
  UserModel.find(req.query, function (err, docs) {
    if (!err) {
      res.send(docs.toJson())
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
  var user = new UserModel(req.body)
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
  var body = req.body
  UserModel.findById(req.params.id, function (err, user) {
    if (!err) {
      for (var p in body) {
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
