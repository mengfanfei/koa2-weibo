/**
 * @description 失败信息集合
 */

 module.exports = {
    registerUserNameExistInfo: {
        errno: 10001,
        message: '用户名yi存在'
    },
    registerFailInfo: {
        errno: 10002,
        message: '注册失败，请重试'
    },
     registerUserNameNotExistInfo: {
         errno: 10003,
         message: '用户名未存在'
     },
    jsonSchemaFileInfo: {
        errno: 10009,
        message: '数据格式校验错误'
    },
 }