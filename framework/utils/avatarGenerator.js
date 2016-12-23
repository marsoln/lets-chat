const logger = require('../logger/Logger')
const AVATAR = require('avatar-generator')({
    convert: 'C:\\Program Files\\ImageMagick\\magick' // mlgb的我真是操了
})
const PIXEL_SIZE = 90
const AVATAR_PATH = require('path').join(__dirname, '../../public/avatars/')

module.exports = function(keyword, gender = 'male') {
    // 没有try catch 加上也没用 子进程里跑的生成头像 找不到imageMagick必然报错
    let _filepath = `${AVATAR_PATH}${keyword}.png`
    let _fsstream = require('fs').createWriteStream(_filepath)

    AVATAR(keyword, gender, PIXEL_SIZE)
        .stream()
        .pipe(_fsstream)

    logger(`生成用户${keyword}头像`)
}
