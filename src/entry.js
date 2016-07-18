require('jquery')
import initFunc from './scripts/index'
initFunc(jQuery)
require('socket.io-client')

require('bootstrap')
require('admin-lte')

require('angular')
import ngBootstrap from './scripts/main'


ngBootstrap()
