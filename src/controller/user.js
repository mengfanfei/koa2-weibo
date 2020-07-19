/**
 * user controller
 */

const { getUserInfo, createUser } = require("../services/user")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo } = require("../model/ErrorInfo")
const doCrypto = require("../utils/cryp")

 /**
  * 用户名是否存在
  * @param {string} userName 
  */
 async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
 }

 /**
  * 用户注册
  * @param {string} userName 
  * @param {string} password 
  * @param {number} gender 
  */
 async function register({userName, password, gender}) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({userName, password: doCrypto(password), gender})
        return new SuccessModel()
    } catch (error) {
        console.error(error.message, error.stack)
        return new ErrorModel(registerFailInfo)
    }
 }

 module.exports = {
     isExist,
     register
 }