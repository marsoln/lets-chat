'use strict';
var redis = require('redis');
var propReader = require('properties-reader')('server.properties');
let client = redis.createClient(propReader.get('redisServer.port'), propReader.get('redisServer.ip'), {});

client
  .on('ready', ()=> {
    console.log(`redis connected successfully.`);
  })
  .on('reconnecting', ()=> {
    console.log('redis reconnecting...');
  })
  .on("error", (err)=> {
    console.error(`redis connect error:${err}`);
  })
;

/**
 * provide the basic redis-client connection instance
 */
module.exports = client;