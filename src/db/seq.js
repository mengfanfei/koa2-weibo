/**
 * @description sequelize 对象关系映射
 * @author mengfanfei
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, database, user, password } = MYSQL_CONF
const conf = { 
  host: host,
  dialect: 'mysql'
}

// 测试环境 不打印sql语句
if (isTest) {
  conf.logging = () => {}
}

// 线上环境 使用连接池
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000 // 如果一个连接池 10s 之内没有被使用，则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq