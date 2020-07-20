/**
 * @description weibo 数据格式校验
 * @author mengfanfei
 */

const validate = require("./_validate")

 const schema = {
     type: 'object',
     properties: {
         content: {
             type: 'string'
         },
         image: {
             type: 'string',
             maxlength: 255
         }
     }
 }

 /**
  * 校验微博数据格式
  * @param {Object} data 微博数据
  */
 function blogValidate(data = {}) {
     return validate(schema, data)
 }

 module.exports  = blogValidate