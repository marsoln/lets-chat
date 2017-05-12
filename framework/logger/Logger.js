const __DEV__ = process.env.NODE_ENV !== 'production'
class Logger {
    constructor() {
        if (__DEV__) {
            this.record = function (msg) {
                console.log(`${new Date().toLocaleString()} - ${msg}`)
            }
        } else {
            this.record = function (msg) {
                // todo 正式环境的日志记录
            }
        }
    }
}

let logger = new Logger()

module.exports = logger.record
