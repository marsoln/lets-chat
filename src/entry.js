import initFunc from './scripts/index'
import jQuery from 'jquery'
import io from 'socket.io-client'
require('./styles/style.scss')

window.jQuery = window.$ = jQuery
window.io = io
initFunc()
require('bootstrap')
require('angular')

import ngBootstrap from './scripts/main'

require('admin-lte')

ngBootstrap()
