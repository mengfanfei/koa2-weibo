/**
 * @description 登录验证的中间件
 * @author mengfanfei
 */

const { ErrorModel } = require("../model/ResModel")


 /**
  * API验证登录
  * @param {Object} ctx 
  * @param {function} next 
  */
 async function loginCheck(ctx, next) {
    if(ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
 }


 /**
  * 页面验证登录
  * @param {Object} ctx 
  * @param {function} next 
  */
 async function loginRedirect(ctx, next) {
    if(ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 未登录
    const url = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(url))
 }

 module.exports = {
     loginCheck,
     loginRedirect
 }

