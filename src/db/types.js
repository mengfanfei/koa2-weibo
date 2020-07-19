/**
 * 封装seqlize 数据类型
 */


 const sequelize = require('sequelize')

 module.exports = {
     STRING: sequelize.STRING,
     DECIMAL: sequelize.DECIMAL,
     TEXT: sequelize.TEXT,
     INTEGER: sequelize.INTEGER,
     BOOLEAN: sequelize.BOOLEAN,
 }