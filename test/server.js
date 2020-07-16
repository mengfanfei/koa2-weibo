/**
 * @description jest server
 * @author mengfanfei
 */



const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)