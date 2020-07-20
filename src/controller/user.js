/**
 * user controller
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require("../services/user")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { 
    registerUserNameNotExistInfo, 
    registerUserNameExistInfo, 
    registerFailInfo, 
    loginFailInfo, 
    deleteUserFailInfo,
    changeInfoFailInfo
 } = require("../model/ErrorInfo")
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

 /**
  * 删除当前用户
  * @param {string} userName 用户名
  */
 async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel({data: '删除用户成功'})
    } else {
        return new ErrorModel(deleteUserFailInfo)
    }
 }


 /**
  * 修改个人信息
  * @param {Object} ctx koa2 ctx
  * @param {string} nickName 
  * @param {string} city 
  * @param {string} picture 
  */
 async function changeInfo(ctx, {nickName, city, picture}) {
    const { userName } = ctx.session.userInfo 
    if (!nickName) {
        nickName = userName
    }
    const result = await updateUser(
        {newNickName: nickName, newPicture: picture, newCity: city},
        { userName }
    )

    if (result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            picture,
            city
        })
        // fanhui
        return new SuccessModel({data: '修改成功'})
    } else {
        return new ErrorModel(changeInfoFailInfo)
    }
 }

 module.exports = {
     isExist,
     register,
     login,
     deleteCurUser,
     changeInfo
 }