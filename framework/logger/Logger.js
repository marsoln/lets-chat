class Logger {
    constructor() {
        if (~process.env.NODE_ENV.indexOf('DEV')) {
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
