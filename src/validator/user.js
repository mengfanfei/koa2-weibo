/**
 * @description user 数据格式校验
 */

const validate = require("./_validate")

 const schema = {
     type: 'object',
     properties: {
         userName: {
             type: 'string',
             pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',  // 字母开头，字母数字下划线
             maxLength: 255,
             minLength: 2
         },
         password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 3
        }
     }
 }

 /**
  * 校验用户数据格式
  * @param {Object} data 用户数据
  */
 function userValidate(data = {}) {
     return validate(schema, data)
 }

 module.exports  = userValidate