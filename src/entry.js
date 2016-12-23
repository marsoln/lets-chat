import jQuery from 'jquery'
import initFunc from './scripts/index'
// window.$ = window.jQuery = jQuery

initFunc(jQuery)
import io from 'socket.io-client'
// window.io = io

require('bootstrap')

require('angular')
import ngBootstrap from './scripts/main'
require('admin-lte')

ngBootstrap()
