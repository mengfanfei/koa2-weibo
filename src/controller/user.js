/**
 * user controller
 */

const { getUserInfo, createUser, deleteUser } = require("../services/user")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo } = require("../model/ErrorInfo")
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

 /**
  * 登录
  * @param {Object} ctx koa2 ctx
  * @param {string} userName 用户名
  * @param {string} password 密码
  */
 async function login(ctx, userName, password) {

    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))

    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel({data: '登录成功'})
 }

 async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel({data: '删除用户成功'})
    } else {
        return new ErrorModel(deleteUserFailInfo)
    }
 }

 module.exports = {
     isExist,
     register,
     login,
     deleteCurUser
 }