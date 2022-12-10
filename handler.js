'use strict';
const ServerlessHttp = require('serverless-http');
const app=require('./index')
module.exports.hello =ServerlessHttp(app)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
;
