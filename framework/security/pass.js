// check out https://github.com/visionmedia/node-pwd

/**
 * Module dependencies.
 */

let crypto = require('crypto')

/**
 * Bytesize.
 */

let len = 128

/**
 * Iterations. ~300ms
 */

let iterations = 12000

let digest = 'sha512'
/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} pwd to hash
 * @param {String} salt salt
 * @param {Function} fn
 * @api public
 */

exports.hash = function (pwd, salt, fn) {
  if (arguments.length === 3) {
    crypto.pbkdf2(pwd, salt, iterations, len, digest, fn)
  } else {
    fn = salt
    crypto.randomBytes(len, function (err, salt) {
      if (err) return fn(err)
      salt = salt.toString('base64')
      crypto.pbkdf2(pwd, salt, iterations, len, digest, function (err, hash) {
        if (err) return fn(err)
        fn(null, salt, hash)
      })
    })
  }
}
