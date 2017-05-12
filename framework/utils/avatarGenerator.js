const logger = require('../logger/Logger')
const IMAGE_MAGICK_PATH = 'C:\\Program Files\\ImageMagick\\magick'
const AVATAR = require('avatar-generator')({
  convert: IMAGE_MAGICK_PATH
})
const PIXEL_SIZE = 90
const AVATAR_PATH = require('path').join(__dirname, '../../public/avatars/')

module.exports = function (keyword, gender = 'male', callback) {
  // 没有try catch 加上也没用 子进程里跑的生成头像 找不到imageMagick必然报错
  let _filepath = `${AVATAR_PATH}${keyword}.png`
  let _fsstream = require('fs').createWriteStream(_filepath)

  if (callback && typeof callback === 'function') {
    _fsstream.on('close', callback)
  }

  AVATAR(keyword, gender, PIXEL_SIZE)
    .stream()
    .pipe(_fsstream)
  logger(`生成用户${keyword}头像`)
}
